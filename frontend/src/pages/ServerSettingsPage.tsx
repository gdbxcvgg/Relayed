import { useNavigate, useParams } from "react-router";
import useServer from "../hooks/useServer";
import { useEffect } from "react";
import useUser from "../hooks/useUser";

const ServerSettingsPage = () => {
    const { serverId } = useParams();
    const { server, setServer } = useServer();
    const { user } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (!serverId) return;

        const loadServer = async () => {
            const res = await setServer(serverId);
            if (res === false) navigate("/channels/@me");
        };

        loadServer();
    }, [serverId]);

    useEffect(() => {
        if (!server || !user) return;

        if (server.owner.id !== user.id) navigate("/channels/@me");
    }, [server, user]);

    return (
        <div>
            <div>{server?.name} settings</div>
        </div>
    );
};

export default ServerSettingsPage;
