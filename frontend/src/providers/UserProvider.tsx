import UserContext from "../contexts/UserContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import { type ServerType } from "../contexts/ServerContext";
import useGateway from "../hooks/useGateway";
import { ReadyState } from "react-use-websocket";

interface UserType {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, _setUser] = useState<UserType | null>(null);
    const [servers, _setServers] = useState<ServerType[] | null>(null);

    const { readyState, sendJsonMessage } = useGateway();

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

    return <UserContext value={{ user, servers }}>{children}</UserContext>;
};

export default UserProvider;
