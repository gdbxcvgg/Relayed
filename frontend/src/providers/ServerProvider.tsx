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

export interface ServerType {
    id: string;
    name: string;
    icon: string | null;
    owner: UserType;
    rooms?: RoomType[];
}

const ServerProvider = ({ children }: { children: React.ReactNode }) => {
    const [server, _setServer] = useState<ServerType | null>(null);

    const { sendJsonMessage } = useGateway();

    const setServer = async (serverId: string): Promise<boolean> => {
        const getRooms = async (serverId: string) => {
            const res = await api.get<RoomType[]>(`servers/${serverId}/rooms`);
            if (res.status !== 200) return [];
            return res.data;
        };
        try {
            const res = await api.get<ServerType>(`servers/${serverId}`);
            if (res.status !== 200) return false;

            const rooms = await getRooms(serverId);
            _setServer({ ...res.data, rooms: rooms });
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
    }, [server]);

    return (
        <ServerContext value={{ server, setServer }}>{children}</ServerContext>
    );
};

export default ServerProvider;
