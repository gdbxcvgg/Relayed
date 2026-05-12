import { createContext } from "react";
import type { MessageType } from "../types/message";

interface MessagesProps {
    messages: MessageType[];
    sendMessage(content: string): Promise<boolean>;
    deleteMessage(messageId: string): Promise<boolean>;
    fetchBeforeMessages(before: string): void;
    fetchedAll: boolean;
}

const MessagesContext = createContext<MessagesProps | null>(null);

export default MessagesContext;
