import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useServer from "../hooks/useServer";
import RoomView from "../components/server/RoomView";
import RoomProvider from "../providers/RoomProvider";

const ServerPage = () => {
    const { serverId, roomId } = useParams();
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

    return roomId ? (
        <RoomProvider>
            <RoomView />
        </RoomProvider>
    ) : (
        <div className="h-full w-full flex flex-col items-center justify-center pb-50">
            <div className="max-w-md h-fit">
                {`Welcome to ${server?.name}! Select room from the sidebar and start chatting.`}
            </div>
        </div>
    );
};

export default ServerPage;
