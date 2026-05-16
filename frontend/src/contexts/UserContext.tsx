import { createContext } from "react";
import type { UserType } from "../types/user";
import type { ServerType } from "../types/server";
import type { RoomType } from "../types/room";

interface UserProps {
    user: UserType | null;
    servers?: ServerType[] | null;
    dmChannels?: RoomType[] | null;
}

const UserContext = createContext<UserProps | null>(null);

export default UserContext;
