import { useEffect, useRef } from "react";
import useMessages from "../../hooks/useMessages";
import Message from "./Message";

const MessagesList = ({
    scroll,
    scrollAtBottom,
}: {
    scroll: () => void;
    scrollAtBottom: () => void;
}) => {
    const { messages } = useMessages();

    const scrolled = useRef(false);

    useEffect(() => {
        if (messages.length > 0 && !scrolled.current) {
            scrolled.current = true;
            scroll();
        } else {
            scrollAtBottom();
        }
    }, [messages]);

    return (
        <>
            <div>
                {messages
                    .slice(0)
                    .reverse()
                    .map((message, index) => {
                        let small = false;
                        if (index > 0) {
                            const prevMsg = messages.slice(0).reverse()[
                                index - 1
                            ];

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
        </>
    );
};

export default MessagesList;
