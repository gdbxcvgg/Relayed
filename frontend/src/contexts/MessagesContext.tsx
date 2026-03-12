import { createContext } from "react";
import type { MessageType } from "../types/message";

interface MessageCreateType {
    content: string;
}

interface MessagesProps {
    messages: MessageType[];
    sendMessage(content: MessageCreateType): Promise<boolean>;
    deleteMessage(messageId: string): Promise<boolean>;
}

const MessagesContext = createContext<MessagesProps | null>(null);

export default MessagesContext;
