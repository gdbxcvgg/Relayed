import { useEffect, useState } from "react";
import RoomContext from "../contexts/RoomContext";
import useGateway from "../hooks/useGateway";
import useServer from "../hooks/useServer";
import type { RoomType } from "../types/room";
import api from "../services/api";

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [room, _setRoom] = useState<RoomType | null>(null);

    const { sendJsonMessage } = useGateway();
    const { server } = useServer();

    const setRoom = async (roomId: string) => {
        const room = server?.rooms?.find((room) => room.id === roomId);
        if (!room) {
            const res = await api.get(`rooms/${roomId}`);
            _setRoom(res.data);
        } else _setRoom(room ?? null);
    };

    useEffect(() => {
        if (!room) return;
        sendJsonMessage({
            opcode: 1,
            data: {
                server_id: server?.id ?? "",
                rooms: [
                    {
                        id: room.id,
                    },
                ],
            },
        });
    }, [room]);

    return <RoomContext value={{ room, setRoom }}> {children} </RoomContext>;
};

export default RoomProvider;
