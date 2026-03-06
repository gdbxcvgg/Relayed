import { useEffect, useState } from "react";
import MessagesContext from "../contexts/MessagesContext";
import { type MessageType } from "../components/Message";
import api from "../services/api";
import useRoom from "../hooks/useRoom";

interface MessageCreateType {
    content: string;
}

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { room } = useRoom();

    const sendMessage = async (content: MessageCreateType) => {
        if (!room) return false;
        try {
            const res = await api.post<MessageType>(
                `rooms/${room.id}/messages`,
                content,
            );
            if (res.status !== 201) return false;
            setMessages((m) => [res.data, ...m]);
        } catch {
            return false;
        }
        return true;
    };

    const deleteMessage = async (messageId: string) => {
        if (!room) return false;
        try {
            const res = await api.delete(
                `rooms/${room.id}/messages/${messageId}`,
            );
            if (res.status !== 204) return false;
        } catch {
            return false;
        }

        setMessages((m) => m.filter((msg) => msg.id !== messageId));
        return true;
    };

    useEffect(() => {
        if (!room) return;
        api.get<MessageType[]>(`rooms/${room.id}/messages`).then((res) => {
            if (res.status !== 200) return;
            setMessages(res.data);
        });
    }, [room]);

    if (!room) return null;

    return (
        <MessagesContext
            value={{
                messages,
                sendMessage,
                deleteMessage,
            }}
        >
            {children}
        </MessagesContext>
    );
};

export default MessagesProvider;
