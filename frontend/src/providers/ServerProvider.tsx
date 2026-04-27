import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import ServerContext from "../contexts/ServerContext";
import useGateway from "../hooks/useGateway";
import type { ServerMemberType, ServerType } from "../types/server";
import type { RoomType } from "../types/room";
import useUser from "../hooks/useUser";

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
    const [server, _setServer] = useState<ServerType | null>(null);

    const { servers: userServers } = useUser();
    const { sendJsonMessage, lastJsonMessage } = useGateway();

    const serverSeqRef = useRef(0);

    const getRooms = async (serverId: string) => {
        const res = await api.get<RoomType[]>(`servers/${serverId}/rooms`);
        if (res.status !== 200) return [];
        return res.data;
    };

    const getMembers = async (serverId: string) => {
        const res = await api.get<ServerMemberType[]>(
            `servers/${serverId}/members`,
        );
        if (res.status !== 200) return [];
        return res.data;
    };

    const setServer = async (serverId: string): Promise<boolean> => {
        const currentSeq = ++serverSeqRef.current;

        const server = userServers?.find((server) => server.id === serverId);

        if (!server) return false;

        _setServer({ ...server, rooms: [], members: [] });

        const [rooms, members] = await Promise.all([
            getRooms(serverId),
            getMembers(serverId),
        ]);

        if (currentSeq === serverSeqRef.current)
            _setServer({ ...server, rooms: rooms, members: members });

        return true;
    };

    useEffect(() => {
        if (!server) return;
        sendJsonMessage({
            opcode: 1,
            data: {
                server_id: server.id,
            },
        });
    }, [server, sendJsonMessage]);

    useEffect(() => {
        const memberJoined = () => {
            if (lastJsonMessage.type !== "MEMBER_JOINED") return;
            _setServer((s) => {
                if (!s) return null;
                return {
                    ...s,
                    members: [...(s.members ?? []), lastJsonMessage.data],
                };
            });
        };

        const memberLeft = () => {
            if (lastJsonMessage.type !== "MEMBER_LEFT") return;
            _setServer((s) => {
                if (!s) return null;
                return {
                    ...s,
                    members: [...(s.members ?? [])]
                        .filter(
                            (mem) =>
                                mem.user.id !== lastJsonMessage.data.user.id,
                        )
                        .sort(
                            (a: ServerMemberType, b: ServerMemberType) =>
                                Number(new Date(a.joined_at)) -
                                Number(new Date(b.joined_at)),
                        ),
                };
            });
        };

        if (!lastJsonMessage) return;

        if (lastJsonMessage.type === "MEMBER_JOINED") {
            memberJoined();
        }
        if (lastJsonMessage.type === "MEMBER_LEFT") {
            memberLeft();
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        const roomCreated = () => {
            if (lastJsonMessage.type !== "ROOM_CREATED") return;
            _setServer((s) => {
                if (!s) return null;
                return {
                    ...s,
                    rooms: [...(s.rooms ?? []), lastJsonMessage.data],
                };
            });
        };

        const roomDeleted = () => {
            if (lastJsonMessage.type !== "ROOM_DELETED") return;
            _setServer((s) => {
                if (!s) return null;
                return {
                    ...s,
                    rooms: s.rooms?.filter(
                        (room) => room.id !== lastJsonMessage.data.id,
                    ),
                };
            });
        };

        const roomUpdated = () => {
            if (lastJsonMessage.type !== "ROOM_UPDATED") return;
            _setServer((s) => {
                if (!s) return null;
                return {
                    ...s,
                    rooms: s.rooms?.map((room) =>
                        room.id === lastJsonMessage.data.id
                            ? lastJsonMessage.data
                            : room,
                    ),
                };
            });
        };

        if (!lastJsonMessage) return;

        if (lastJsonMessage.type === "ROOM_CREATED") {
            roomCreated();
        }

        if (lastJsonMessage.type === "ROOM_DELETED") {
            roomDeleted();
        }

        if (lastJsonMessage.type === "ROOM_UPDATED") {
            roomUpdated();
        }
    }, [lastJsonMessage]);

    return (
        <ServerContext value={{ server, setServer }}>{children}</ServerContext>
    );
};

export default ServerProvider;
