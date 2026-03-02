import { useState } from "react";
import api from "../services/api";
import RoomContext from "../contexts/RoomContext";

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

export default RoomProvider;
