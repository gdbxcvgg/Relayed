import type { UserType } from "./user";

export type MessageType = {
    id: string;
    content: string;
    author: UserType;
    room_id: string;
    created_at: string;
    edited_at: string | null;
    queued?: boolean;
    error?: boolean;
}


export type DeletedMessageType = {
    id: string;
    room_id: string;
}