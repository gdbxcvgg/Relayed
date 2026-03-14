import UserContext from "../contexts/UserContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import useGateway from "../hooks/useGateway";
import { ReadyState } from "react-use-websocket";
import type { ServerType } from "../types/server";

interface UserType {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, _setUser] = useState<UserType | null>(null);
    const [servers, _setServers] = useState<ServerType[]>([]);

    const { readyState, sendJsonMessage, lastJsonMessage } = useGateway();

    useEffect(() => {
        if (ReadyState[readyState] !== "OPEN") return;

        sendJsonMessage({
            opcode: 0,
            data: {
                token: localStorage.getItem("access"),
            },
        });

        console.log("[GATEWAY]: Authenticated");
    }, [readyState]);

    const _getServers = async () => {
        const res = await api.get<ServerType[]>("users/@me/servers");
        if (res.status !== 200) return false;
        _setServers(res.data);
    };

    const _getUser = async () => {
        const res = await api.get<UserType>("users/@me");
        if (res.status !== 200) return false;
        _setUser(res.data);
        return true;
    };

    useEffect(() => {
        const fetchData = async () => {
            _getUser();
            _getServers();
        };

        fetchData();
    }, []);

    useEffect(() => {
        const joinedServer = async () => {
            if (lastJsonMessage.type !== "SERVER_JOINED") return;
            const serverId = lastJsonMessage.data.id;

            const res = await api.get<ServerType>(`servers/${serverId}`);
            if (res.status !== 200) return false;

            _setServers((servers) =>
                [...servers, res.data].sort(
                    (a: ServerType, b: ServerType) =>
                        Number(new Date(a.created_at)) -
                        Number(new Date(b.created_at)),
                ),
            );
        };

        const leftServer = () => {
            if (lastJsonMessage.type !== "SERVER_LEFT") return;
            const serverId = lastJsonMessage.data.id;
            _setServers((servers) =>
                servers.filter((sv) => sv.id !== serverId),
            );
        };

        if (!lastJsonMessage) return;
        if (lastJsonMessage.type === "SERVER_JOINED") {
            joinedServer();
        } else if (lastJsonMessage.type === "SERVER_LEFT") {
            leftServer();
        }
    }, [lastJsonMessage]);

    return <UserContext value={{ user, servers }}>{children}</UserContext>;
};

export default UserProvider;
