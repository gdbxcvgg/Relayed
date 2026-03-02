import { createContext } from "react";

interface RoomType {
    id: string;
    name: string;
    description: string | null;
    room_type: number;
    parent: string | null;
    created_at: string;
}

interface RoomProps {
    room: RoomType | null;
    setRoom(roomId: string): Promise<boolean>;
}

const RoomContext = createContext<RoomProps | null>(null);

export default RoomContext;
