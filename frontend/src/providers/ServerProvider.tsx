import { useEffect, useState } from "react";
import api from "../services/api";
import ServerContext from "../contexts/ServerContext";
import useGateway from "../hooks/useGateway";
import type { UserType } from "../contexts/UserContext";

interface RoomType {
    id: string;
    name: string;
    description: string | null;
    room_type: number;
    parent: string | null;
    created_at: string;
}

interface MemberType {
    joined_at: string;
    user: UserType;
}

export interface ServerType {
    id: string;
    name: string;
    icon: string | null;
    owner: UserType;
    created_at: string;
    rooms?: RoomType[];
    members: MemberType[];
}

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
    const [server, _setServer] = useState<ServerType | null>(null);

    const { sendJsonMessage, lastJsonMessage } = useGateway();

    const setServer = async (serverId: string): Promise<boolean> => {
        const getRooms = async (serverId: string) => {
            const res = await api.get<RoomType[]>(`servers/${serverId}/rooms`);
            if (res.status !== 200) return [];
            return res.data;
        };

        const getMembers = async (serverId: string) => {
            const res = await api.get<MemberType[]>(
                `servers/${serverId}/members`,
            );
            if (res.status !== 200) return [];
            return res.data;
        };

        try {
            const res = await api.get<ServerType>(`servers/${serverId}`);
            if (res.status !== 200) return false;

            const rooms = await getRooms(serverId);
            const members = await getMembers(serverId);

            _setServer({ ...res.data, rooms: rooms, members: members });
        } catch {
            _setServer(null);
            return false;
        }

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
            _setServer((s) => {
                if (!s) return null;
                return { ...s, members: [...s.members, lastJsonMessage.data] };
            });
        };

        const memberLeft = () => {
            _setServer((s) => {
                if (!s) return null;
                return {
                    ...s,
                    members: [
                        ...s.members
                            .filter(
                                (mem) =>
                                    mem.user.id !==
                                    lastJsonMessage.data.user.id,
                            )
                            .sort(
                                (a: MemberType, b: MemberType) =>
                                    Number(new Date(a.joined_at)) -
                                    Number(new Date(b.joined_at)),
                            ),
                    ],
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

    return (
        <ServerContext value={{ server, setServer }}>{children}</ServerContext>
    );
};

export default ServerProvider;
