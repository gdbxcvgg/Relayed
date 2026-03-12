import { createContext } from "react";
import type { UserType } from "../types/user";
import type { ServerType } from "../types/server";

interface UserProps {
    user: UserType | null;
    servers?: ServerType[] | null;
}

const UserContext = createContext<UserProps | null>(null);

export default UserContext;
