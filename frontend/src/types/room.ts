import type { ServerType } from "./server";

export type RoomType = {
    id: string;
    name: string;
    description: string | null;
    room_type: number;
    parent: string | null;
    created_at: string;
    server?: ServerType;
}


export type DeletedRoomType = {
    id: string;
    server_id: string;
}