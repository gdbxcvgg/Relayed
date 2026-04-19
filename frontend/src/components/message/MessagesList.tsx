import { useEffect, useRef } from "react";
import { useOnInView } from "react-intersection-observer";
import useMessages from "../../hooks/useMessages";
import Message from "./Message";
import useRoom from "../../hooks/useRoom";

const MessagesList = ({
    scroll,
    scrollAtBottom,
}: {
    scroll: () => void;
    scrollAtBottom: () => void;
}) => {
    const { messages, fetchBeforeMessages } = useMessages();
    const { room } = useRoom();

    const scrolled = useRef(false);

    const inViewRef = useOnInView((inView) => {
        if (!inView || messages.length === 0) return;
        fetchBeforeMessages(messages.slice(0).reverse()[0].id);
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
        <div>
            <div ref={inViewRef}></div>
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
