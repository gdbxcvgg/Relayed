import { useEffect, useRef } from "react";
import MessagesProvider from "../../providers/MessagesProvider";
import useView from "../../hooks/useView";
import useRoom from "../../hooks/useRoom";
import MessagesList from "../message/MessagesList";
import MessageInput from "../message/MessageInput";
import { useParams } from "react-router";
import UserAvatar from "../user/UserAvatar";

const DMRoomView = () => {
    const { room } = useRoom();

    const { openMenu } = useView();

    const { setRoom } = useRoom();
    const { roomId } = useParams();

    useEffect(() => {
        if (!roomId) return;

        const loadRoom = async () => {
            setRoom(roomId);
        };

        loadRoom();
    }, [roomId]);

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
                    <div className="flex items-center gap-3">
                        <UserAvatar user={room?.recipients?.at(0)} />
                        {room?.recipients?.at(0)?.display_name ??
                            room?.recipients?.at(0)?.username}
                    </div>
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
                </div>
            </div>
        </MessagesProvider>
    );
};

export default DMRoomView;
