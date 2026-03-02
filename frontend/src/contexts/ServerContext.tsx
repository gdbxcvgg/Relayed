import { createContext } from "react";

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

interface ServerProps {
    server: ServerType | null;
    setServer(serverId: string): Promise<boolean>;
}

const ServerContext = createContext<ServerProps | null>(null);

export default ServerContext;
