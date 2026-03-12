import type { User } from "./user";

export type Message = {
    id: string;
    content: string;
    author: User;
    room_id: string;
    created_at: string;
    edited_at: string;
}

export type DeletedMessage = {
    id: string;
    room_id: string;
}