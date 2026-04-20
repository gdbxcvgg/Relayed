import { useEffect, useState } from "react";
import MessagesContext from "../contexts/MessagesContext";
import api from "../services/api";
import useRoom from "../hooks/useRoom";
import useGateway from "../hooks/useGateway";
import useUser from "../hooks/useUser";
import type { MessageType } from "../types/message";

import { v4 as uuidv4 } from "uuid";

const MESSAGE_LIMIT = 50;

interface MessageCreateType {
    content: string;
}

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const { room } = useRoom();

    const { lastJsonMessage } = useGateway();
    const { user } = useUser();

    const _sendMsg = async (message: MessageCreateType, qMsgId: string) => {
        const res = await api.post<MessageType>(
            `rooms/${room?.id}/messages`,
            message,
        );

        if (res.status !== 201) {
            setMessages((prev) =>
                prev.map((m) => {
                    if (m.id === qMsgId) return { ...m, error: true };
                    return m;
                }),
            );
            return false;
        }
        setMessages((prev) =>
            prev.map((m) => {
                if (m.id === qMsgId)
                    return { ...res.data, created_at: m.created_at };
                return m;
            }),
        );
    };

    const sendMessage = async (message: MessageCreateType) => {
        if (!room || !user) return false;

        const queuedMsgId = "q_" + uuidv4();

        const queuedMessage: MessageType = {
            id: queuedMsgId,
            content: message.content,
            created_at: new Date().toISOString(),
            edited_at: null,
            author: user,
            room_id: room.id,
            queued: true,
        };

        setMessages((m) => [queuedMessage, ...m]);

        _sendMsg(message, queuedMsgId);

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

    const fetchBeforeMessages = async (beforeId: string) => {
        if (!room) return;

        const res = await api.get(
            `rooms/${room.id}/messages?limit=${MESSAGE_LIMIT}&before=${beforeId}`,
        );

        if (res.status !== 200) return;
        setMessages((m) => [...m, ...res.data]);
    };

    useEffect(() => {
        if (!room) return;
        api.get<MessageType[]>(
            `rooms/${room.id}/messages?limit=${MESSAGE_LIMIT}`,
        ).then((res) => {
            if (res.status !== 200) return;
            setMessages(res.data);
        });
    }, [room]);

    useEffect(() => {
        const newMessage = () => {
            if (lastJsonMessage.type !== "MESSAGE_SEND") return;
            if (lastJsonMessage.data.author.id === user?.id) return;
            if (lastJsonMessage.data.room_id !== room?.id) return;
            setMessages((m) => [lastJsonMessage.data, ...m]);
        };

        const deletedMessage = () => {
            if (lastJsonMessage.type !== "MESSAGE_DELETED") return;
            setMessages((m) =>
                m.filter((msg) => msg.id !== lastJsonMessage.data.id),
            );
        };

        const updatedMessage = () => {
            if (lastJsonMessage.type !== "MESSAGE_UPDATED") return;
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === lastJsonMessage.data.id
                        ? { ...msg, ...lastJsonMessage.data }
                        : msg,
                ),
            );
        };

        if (!lastJsonMessage) return;
        if (lastJsonMessage.type === "MESSAGE_SEND") {
            newMessage();
        } else if (lastJsonMessage.type === "MESSAGE_DELETED") {
            deletedMessage();
        } else if (lastJsonMessage.type === "MESSAGE_UPDATED") {
            updatedMessage();
        }
    }, [lastJsonMessage]);

    if (!room) return null;

    return (
        <MessagesContext
            value={{
                messages,
                sendMessage,
                deleteMessage,
                fetchBeforeMessages,
            }}
        >
            {children}
        </MessagesContext>
    );
};

export default MessagesProvider;
