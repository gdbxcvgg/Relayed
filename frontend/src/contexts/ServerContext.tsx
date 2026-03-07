import { createContext } from "react";
import type { UserType } from "./UserContext";

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
    created_at: string;
    rooms?: RoomType[];
}

interface ServerProps {
    server: ServerType | null;
    setServer(serverId: string): Promise<boolean>;
}

const ServerContext = createContext<ServerProps | null>(null);

export default ServerContext;
