import { useEffect, useState } from "react";
import BaseSidebar from "./BaseSidebar";
import type { RoomType } from "../types/room";
import api from "../services/api";
import DM from "./DM";

const FriendsSidebar = () => {
    const [dmRooms, setDmRooms] = useState<RoomType[]>([]);

    useEffect(() => {
        const getDms = async () => {
            const res = await api.get<RoomType[]>("users/@me/channels");
            if (res.status !== 200) return;
            setDmRooms(res.data);
        };

        getDms();
    }, []);

    return (
        <BaseSidebar>
            <div className="h-[50px] shrink-0 w-full flex items-center px-3 border-b border-b-(--border-color)">
                <div>Direct Messages</div>
            </div>
            <div className="scrollbar-hide overflow-y-scroll p-3">
                <div className="flex flex-col gap-3">
                    {dmRooms.map((room) => (
                        <DM room={room} key={room.id} />
                    ))}
                </div>
            </div>
        </BaseSidebar>
    );
};

export default FriendsSidebar;
