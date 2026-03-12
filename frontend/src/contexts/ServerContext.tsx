import { createContext } from "react";
import type { ServerType } from "../types/server";

interface ServerProps {
    server: ServerType | null;
    setServer(serverId: string): Promise<boolean>;
}

const ServerContext = createContext<ServerProps | null>(null);

export default ServerContext;
