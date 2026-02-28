import { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import api from "../services/api";
import Message from "./Message";

interface MessageAuthorType {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

interface MessageType {
    id: string;
    content: string;
    author: MessageAuthorType;
    room_id: string;
    created_at: string;
    edited_at: string;
}

const MessagesList = () => {
    const [messages, setMessages] = useState<MessageType[]>([]);

    const { room } = useRoom();

    useEffect(() => {
        const getMessages = async () => {
            if (!room) return;
            const res = await api.get<MessageType[]>(
                `rooms/${room.id}/messages`,
            );
            if (res.status !== 200) return;

            setMessages(res.data);
        };

        getMessages();
    }, [room]);

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
