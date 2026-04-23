import { useEffect, useRef, useState } from "react";
import { useOnInView } from "react-intersection-observer";
import useMessages from "../../hooks/useMessages";
import Message from "./Message";
import useRoom from "../../hooks/useRoom";
import useServer from "../../hooks/useServer";
import useUser from "../../hooks/useUser";

const VoidMessage = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="flex p-0.5 mt-8">
            <div className="w-12 min-w-1">
                <div className="bg-[#1a1a1a] rounded-full size-9"></div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <div className="bg-[#1a1a1a] w-30 shrink h-4 rounded-md"></div>
                <div className="flex flex-wrap gap-3">
                    {[...Array(count)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#121212] w-55 max-w-full shrink h-4 rounded-md"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MessagesList = ({
    scroll,
    scrollAtBottom,
    containerRef,
}: {
    scroll: () => void;
    scrollAtBottom: () => void;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
    const { messages, fetchBeforeMessages, fetchedAll } = useMessages();
    const { room } = useRoom();
    const { server } = useServer();
    const { user } = useUser();

    const [loading, setLoading] = useState(false);

    const scrolled = useRef(false);

    const loadMoreMessages = async () => {
        if (loading) return;

        const container = containerRef.current;
        if (!container) return;

        setLoading(true);

        const prevScrollHeight = container.scrollHeight;
        await fetchBeforeMessages(messages.slice(0).reverse()[0].id);

        setLoading(false);

        requestAnimationFrame(() => {
            const newScrollHeight = container.scrollHeight;
            container.scrollTop += newScrollHeight - prevScrollHeight;
        });
    };

    const inViewRef = useOnInView((inView) => {
        if (!inView || messages.length === 0) return;
        loadMoreMessages();
    });

    useEffect(() => {
        scrolled.current = false;
    }, [room]);

    useEffect(() => {
        if (messages.length > 0 && !scrolled.current) {
            scrolled.current = true;
            scroll();
        } else {
            scrollAtBottom();
        }
    }, [messages, scroll, scrollAtBottom]);

    return (
        <div className="flex flex-col justify-end min-h-full wrap-break-word">
            <div ref={inViewRef}>
                {fetchedAll && (
                    <div>
                        <div className="py-6.5 flex flex-col gap-5">
                            <div>
                                <div className="text-2xl font-bold">
                                    Welcome to #{room?.name}!
                                </div>
                                <div className="text-sm">
                                    This is the start of the #{room?.name}{" "}
                                    channel.
                                </div>
                            </div>
                            {server?.owner.id === user?.id && (
                                <button className="text-sm p-1.5 px-3 border border-(--border-color) rounded-lg w-fit flex gap-2 items-center hover:cursor-pointer hover:bg-[#121212] active:bg-[#181818]">
                                    <img src="/edit.png" className="size-3.5" />
                                    <div>Edit channel</div>
                                </button>
                            )}
                        </div>
                        {messages.length > 0 && (
                            <div className="border-b border-b-(--border-color)"></div>
                        )}
                    </div>
                )}
                {!fetchedAll && messages.length !== 0 && (
                    <>
                        <VoidMessage count={2} />
                        <VoidMessage />
                        <VoidMessage count={1} />
                        <VoidMessage count={2} />
                        <VoidMessage />
                        <VoidMessage count={2} />
                    </>
                )}
            </div>
            {messages
                .slice(0)
                .reverse()
                .map((message, index) => {
                    let small = false;

                    if (index > 0) {
                        const prevMsg = messages.slice(0).reverse()[index - 1];

                        if (prevMsg.author.id === message.author.id)
                            small = true;

                        const prevDate = new Date(prevMsg.created_at);
                        const currDate = new Date(message.created_at);

                        if (
                            Number(currDate) - Number(prevDate) >
                            30 * 60 * 1000
                        )
                            small = false;
                    }
                    return (
                        <Message
                            message={message}
                            key={message.id}
                            small={small}
                        />
                    );
                })}
        </div>
    );
};

export default MessagesList;
