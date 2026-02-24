import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

interface ServerRoom {
    created_at: string;
    id: string;
    name: string;
    room_type: number;
}

type ServerRoomResponse = ServerRoom[];

const ServerPage = () => {
    const { serverId, roomId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const openFirstRoom = async () => {
            const res = await api.get<ServerRoomResponse>(
                `servers/${serverId}/rooms`,
            );
            if (res.status !== 200) return;

            res.data.forEach((room) => {
                if (room.room_type === 1) {
                    navigate(`${room.id}`);
                }
            });
        };

        if (!roomId) {
            openFirstRoom();
        }
    });

    return (
        <>
            <h1>server</h1>
            <p>{serverId}</p>

            <h1>room</h1>
            <p>{roomId}</p>
        </>
    );
};

export default ServerPage;
