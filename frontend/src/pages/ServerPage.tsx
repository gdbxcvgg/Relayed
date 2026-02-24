import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useServer from "../hooks/useServer";

const ServerPage = () => {
    const { serverId, roomId } = useParams();
    const navigate = useNavigate();

    const { server, setServer } = useServer();

    useEffect(() => {
        if (!serverId) return;

        const loadServer = async () => {
            await setServer(serverId);
        };

        loadServer();
    }, [serverId]);

    useEffect(() => {
        if (!server || roomId) return;

        const firstRoom = server.rooms?.find((room) => room.room_type === 1);

        if (firstRoom) {
            navigate(firstRoom.id);
        }
    }, [server, roomId, navigate]);

    return (
        <>
            <h1>server</h1>
            <p>{server?.id}</p>

            <h1>room</h1>
            <p>{roomId}</p>
        </>
    );
};

export default ServerPage;
