import { Link } from "react-router";
import type { RoomType } from "../../types/room";
import useView from "../../hooks/useView";
import useServer from "../../hooks/useServer";
import useUser from "../../hooks/useUser";

const Room = ({ room }: { room: RoomType }) => {
    const { openChat } = useView();
    const { server } = useServer();
    const { user } = useUser();

    const isServerOwner = server?.owner.id === user?.id;

    return (
        <Link to={`/channels/${server?.id}/${room.id}`} onClick={openChat}>
            <div className="group flex justify-between items-center hover:bg-[#121212] active:bg-[#181818] rounded-md">
                <div># {room.name}</div>
                {isServerOwner && (
                    <img
                        src="/gear.png"
                        className="hidden group-hover:block size-4"
                        onClick={(e) => e.preventDefault()}
                    />
                )}
            </div>
        </Link>
    );
};

export default Room;
