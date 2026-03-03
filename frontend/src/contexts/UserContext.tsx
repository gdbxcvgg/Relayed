import { createContext } from "react";
import { type ServerType } from "./ServerContext";

export interface UserType {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

interface UserProps {
    user: UserType | null;
    servers?: ServerType[] | null;
}

const UserContext = createContext<UserProps | null>(null);

export default UserContext;
