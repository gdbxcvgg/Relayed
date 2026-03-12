import type { User } from "./user";

export type ServerMember = {
    joined_at: string;
    user: User;
}

export type Server = {
    id: string;
    name: string;
    icon: string | null;
    owner: User;
    created_at: string;
}
