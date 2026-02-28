import { createContext, useState } from "react";
import api from "../services/api";

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
    rooms?: RoomType[];
}

interface ProviderProps {
    server: ServerType | null;
    setServer(serverId: string): Promise<boolean>;
}

export const ServerContext = createContext<ProviderProps | null>(null);

export const ServerProvider = ({ children }: { children: React.ReactNode }) => {
    const [server, _setServer] = useState<ServerType | null>(null);

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

    return (
        <ServerContext value={{ server, setServer }}>{children}</ServerContext>
    );
};
