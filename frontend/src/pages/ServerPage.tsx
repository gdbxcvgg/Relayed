import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useServer from "../hooks/useServer";

const ServerPage = () => {
    const { serverId } = useParams();
    const { server, setServer } = useServer();

    const navigate = useNavigate();

    useEffect(() => {
        if (!serverId) return;

        const loadServer = async () => {
            const res = await setServer(serverId);
            if (res === false) navigate("/channels/@me");
        };

        loadServer();
    }, [serverId]);

    return (
        <>
            <h1>server</h1>
            <p>
                {server?.id} {server?.name}
            </p>
        </>
    );
};

export default ServerPage;
