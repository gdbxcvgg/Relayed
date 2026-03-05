import { useEffect, useState } from "react";
import api from "../services/api";
import RoomContext from "../contexts/RoomContext";
import useGateway from "../hooks/useGateway";
import useServer from "../hooks/useServer";

interface RoomType {
    id: string;
    name: string;
    description: string | null;
    room_type: number;
    parent: string | null;
    created_at: string;
}

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [room, _setRoom] = useState<RoomType | null>(null);

    const { sendJsonMessage } = useGateway();
    const { server } = useServer();

    const setRoom = async (roomId: string): Promise<boolean> => {
        try {
            const res = await api.get<RoomType>(`rooms/${roomId}`);

            if (res.status !== 200) return false;

            _setRoom(res.data);
        } catch {
            _setRoom(null);
            return false;
        }

        return true;
    };

    useEffect(() => {
        if (!room || !server) return;
        sendJsonMessage({
            opcode: 1,
            data: {
                server_id: server.id,
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
