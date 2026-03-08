import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useRoom from "../hooks/useRoom";
import useServer from "../hooks/useServer";
import MessagesList from "./MessagesList";
import MemberList from "./MemberList";
import MessagesProvider from "../providers/MessagesProvider";
import MessageInput from "./MessageInput";

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

    return (
        <MessagesProvider>
            <div className="flex flex-col h-full">
                <div className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                    # {room?.name}
                </div>
                <div className="flex flex-row grow min-h-0">
                    <div className="w-full border-r border-r-(--border-color) flex flex-col">
                        <div className="grow overflow-y-auto p-3 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-[3px]">
                            <MessagesList />
                        </div>
                        <MessageInput />
                    </div>
                    <div className="max-w-60 w-full p-3 hidden md:block">
                        <MemberList />
                    </div>
                </div>
            </div>
        </MessagesProvider>
    );
};

export default RoomView;
