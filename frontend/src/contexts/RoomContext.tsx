import { createContext } from "react";
import type { RoomType } from "../types/room";

interface RoomProps {
    room: RoomType | null;
    setRoom: (roomId: string) => void;
}

const RoomContext = createContext<RoomProps | null>(null);

export default RoomContext;
