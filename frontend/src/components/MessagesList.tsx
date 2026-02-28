import { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import api from "../services/api";

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

            setMessages([...messages, ...res.data]);
        };

        getMessages();
    }, [room]);

    return (
        <>
            <div>
                {messages
                    .slice(0)
                    .reverse()
                    .map((message) => (
                        <div key={message.id}>
                            {new Date(message.created_at).toLocaleString(
                                undefined,
                                {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                },
                            )}{" "}
                            {message.author.username}: {message.content}
                        </div>
                    ))}
            </div>
        </>
    );
};

export default MessagesList;
