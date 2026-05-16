import { Link } from "react-router";
import type { RoomType } from "../types/room";
import UserAvatar from "./user/UserAvatar";
import { RoomTypeChoices } from "../shared/constants";

const DM = ({ room }: { room: RoomType }) => {
    if (room.room_type !== RoomTypeChoices.DM) return null;

    return (
        <Link to={`channels/@me/${room.id}`}>
            <div className="flex items-center gap-3 hover:bg-[#141414] cursor-pointer active:bg-[#1a1a1a]">
                <UserAvatar user={room.recipients?.at(0)} />
                {room.recipients?.at(0)?.display_name ??
                    room.recipients?.at(0)?.username}
            </div>
        </Link>
    );
};

export default DM;
