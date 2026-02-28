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

interface ProviderProps {
    room: RoomType | null;
    setRoom(roomId: string): Promise<boolean>;
}

export const RoomContext = createContext<ProviderProps | null>(null);

export const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [room, _setRoom] = useState<RoomType | null>(null);

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

    return <RoomContext value={{ room, setRoom }}> {children} </RoomContext>;
};
