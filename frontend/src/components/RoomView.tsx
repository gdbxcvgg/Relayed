import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useRoom from "../hooks/useRoom";
import useServer from "../hooks/useServer";
import MessagesList from "./MessagesList";
import MemberList from "./MemberList";
import api from "../services/api";

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
    }, [roomId, server]);

    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!room) return;
        e.preventDefault();
        try {
            const res = await api.post(`rooms/${room.id}/messages`, {
                content: message,
            });
            if (res.status !== 201) return;

            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    if (!room) return null;

    return (
        <div className="flex flex-col h-full">
            <div className="h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                # {room.name}
            </div>
            <div className="flex flex-row grow min-h-0">
                <div className="w-full border-r border-r-(--border-color) flex flex-col">
                    <div className="grow overflow-y-auto p-3 [&::-webkit-scrollbar]:[width:6px] [&::-webkit-scrollbar-thumb]:bg-gray-400 overflow-y-auto [&::-webkit-scrollbar-thumb]:[border-radius:3px]">
                        <MessagesList />
                    </div>
                    <div className="p-3 ">
                        <form onSubmit={handleSubmit}>
                            <input
                                className="w-full h-[50px] bg-[#141414] outline-0 p-3 rounded-lg"
                                type="text"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                                placeholder={`Message in #${room.name}`}
                            />
                        </form>
                    </div>
                </div>
                <div className="w-[300px] p-3">
                    <MemberList />
                </div>
            </div>
        </div>
    );
};

export default RoomView;
