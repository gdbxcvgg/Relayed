import { Link } from "react-router";
import type { RoomType } from "../../types/room";
import useView from "../../hooks/useView";
import useServer from "../../hooks/useServer";
import useUser from "../../hooks/useUser";
import PopUpModal from "../PopUpModal";
import RoomSettingsPopup from "./RoomSettingsPopup";
import { useState } from "react";

const Room = ({ room }: { room: RoomType }) => {
    const { openChat } = useView();
    const { server } = useServer();
    const { user } = useUser();

    const [showSettings, setShowSettings] = useState(false);

    const isServerOwner = server?.owner.id === user?.id;

    const handleSettings = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowSettings(true);
    };

    return (
        <>
            <Link to={`/channels/${server?.id}/${room.id}`} onClick={openChat}>
                <div className="group flex justify-between items-center hover:bg-[#121212] active:bg-[#181818] rounded-md">
                    <div className="min-w-0 truncate"># {room.name}</div>
                    {isServerOwner && (
                        <img
                            src="/gear.png"
                            className="hidden group-hover:block size-4"
                            onClick={handleSettings}
                        />
                    )}
                </div>
            </Link>

            <PopUpModal
                open={showSettings}
                onClose={() => setShowSettings(false)}
            >
                <RoomSettingsPopup
                    onClose={() => setShowSettings(false)}
                    room={room}
                />
            </PopUpModal>
        </>
    );
};

export default Room;
