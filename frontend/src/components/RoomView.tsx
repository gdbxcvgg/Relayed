import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useRoom from "../hooks/useRoom";
import useServer from "../hooks/useServer";

const RoomView = () => {
    const { server } = useServer();
    const { room, setRoom } = useRoom();
    const { roomId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId || !server) return;

        const loadRoom = async () => {
            const res = await setRoom(roomId);
            if (res === false) navigate(`/channels/${server.id}`);
        };

        loadRoom();
        console.log(room);
    }, [roomId, server]);

    if (!room) return null;

    return (
        <div className="flex flex-col">
            <div>{room.name}</div>
            <div className="flex flex-row">
                <div>chat</div>
                <div>member list</div>
            </div>
        </div>
    );
};

export default RoomView;
