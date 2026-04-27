import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import useRoom from "../../hooks/useRoom";
import useServer from "../../hooks/useServer";

import MemberList from "./MemberList";
import MessagesProvider from "../../providers/MessagesProvider";
import MessagesList from "../message/MessagesList";
import MessageInput from "../message/MessageInput";
import useView from "../../hooks/useView";

const RoomView = () => {
    const { openMenu } = useView();
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

    useEffect(() => {
        if (!room || !server) return;

        if (room.server_id !== server.id) navigate(`/channels/${server.id}`);
    }, [room, server, navigate]);

    const chatRef = useRef<HTMLDivElement>(null);

    const scroll = () => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    const scrollIfAtBottom = () => {
        const el = chatRef.current;
        if (!el) return;

        const threshold = 100;
        const atBottom =
            el.scrollHeight - el.scrollTop - el.clientHeight < threshold;

        if (atBottom) scroll();
    };

    return (
        <MessagesProvider>
            <div className="flex flex-col h-full">
                <div className="h-[50px] min-h-[50px] w-full flex items-center gap-4 px-3 border-b border-b-(--border-color)">
                    <img
                        src="/arrow-left.png"
                        className="md:hidden w-6 h-7"
                        onClick={openMenu}
                    />
                    <div># {room?.name}</div>
                </div>
                <div className="flex flex-1 min-h-0 w-full">
                    <div className="border-r border-r-(--border-color) flex flex-col flex-1 min-w-0">
                        <div
                            ref={chatRef}
                            className="flex-1 overflow-y-auto p-3 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-[3px]"
                        >
                            <MessagesList
                                scroll={scroll}
                                scrollAtBottom={scrollIfAtBottom}
                                containerRef={chatRef}
                            />
                        </div>
                        <MessageInput scroll={scroll} />
                    </div>
                    <div className="w-55 p-3 hidden md:block">
                        <MemberList />
                    </div>
                </div>
            </div>
        </MessagesProvider>
    );
};

export default RoomView;
