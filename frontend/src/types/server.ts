import type { RoomType } from "./room";
import type { UserType } from "./user";

export type ServerMemberType = {
    joined_at: string;
    user: UserType;
}

export type ServerType = {
    id: string;
    name: string;
    icon: string | null;
    owner: UserType;
    created_at: string;
    rooms?: RoomType[];
    members?: ServerMemberType[];
}
