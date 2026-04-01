import { Link } from "react-router";
import useServer from "../../hooks/useServer";
import { useEffect, useState } from "react";
import type { RoomType } from "../../types/room";
import useUser from "../../hooks/useUser";
import PopUpModal from "../PopUpModal";
import CreateRoomPopup from "./CreateRoomPopup";
import useView from "../../hooks/useView";

interface RoomNode extends RoomType {
    children: RoomType[];
    hidden: boolean;
}

const RoomsList = () => {
    const { openChat } = useView();

    const { server } = useServer();
    const { user } = useUser();
    const [roomTree, setRoomTree] = useState<Record<string, RoomNode>>({});

    const [showCreateRoomMenu, setShowCreateRoomMenu] = useState(false);
    const [parentCategory, setParentCategory] = useState<RoomType | null>(null);

    useEffect(() => {
        const constructRoomTree = () => {
            if (!server) return;

            const roomMap: Record<string, RoomNode> = {};

            server.rooms?.forEach((room) => {
                roomMap[room.id] = { ...room, children: [], hidden: false };
            });

            server.rooms?.forEach((room) => {
                if (room.parent) {
                    roomMap[room.parent].children.push(room);
                    delete roomMap[room.id];
                }
            });

            setRoomTree(roomMap);
        };
        constructRoomTree();
    }, [server]);

    const toggleCategoryHidden = (roomId: string) => {
        setRoomTree((prev) => {
            const updated = { ...prev };

            if (updated[roomId]) {
                updated[roomId] = {
                    ...updated[roomId],
                    hidden: !updated[roomId].hidden,
                };
            }

            return updated;
        });
    };

    const handleRoomCreate = (category: RoomType | null) => {
        setParentCategory(category);
        setShowCreateRoomMenu(true);
    };

    return (
        <>
            {Object.values(roomTree).map((root) => (
                <div key={root.id} className="mb-6">
                    {root.room_type === 1 && (
                        <Link
                            key={root.id}
                            to={`/channels/${server?.id}/${root.id}`}
                            onClick={openChat}
                        >
                            <div className="hover:bg-[#121212] active:bg-[#181818] rounded-md">
                                # {root.name}
                            </div>
                        </Link>
                    )}

                    {root.room_type === 2 && (
                        <>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    {root.name}
                                    <img
                                        src="/arrow-down.png"
                                        className={
                                            root.hidden
                                                ? "w-4 h-4 -rotate-90"
                                                : "w-4 h-4"
                                        }
                                        onClick={() =>
                                            toggleCategoryHidden(root.id)
                                        }
                                    />
                                </div>
                                {server?.owner.id === user?.id && (
                                    <div
                                        className="text-xl hover:cursor-pointer"
                                        onClick={() => handleRoomCreate(root)}
                                    >
                                        +
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                {!root.hidden &&
                                    root.children.map((room) => (
                                        <Link
                                            to={`/channels/${server?.id}/${room.id}`}
                                            key={room.id}
                                            onClick={openChat}
                                        >
                                            <div className="hover:bg-[#121212] active:bg-[#181818] rounded-md">
                                                # {room.name}
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </>
                    )}
                </div>
            ))}

            {server?.owner.id === user?.id && (
                <button
                    className="text-xs hover:font-bold hover:cursor-pointer"
                    onClick={() => handleRoomCreate(null)}
                >
                    + Create Channel
                </button>
            )}

            <PopUpModal
                open={showCreateRoomMenu}
                onClose={() => setShowCreateRoomMenu(false)}
            >
                <CreateRoomPopup
                    onClose={() => setShowCreateRoomMenu(false)}
                    category={parentCategory}
                />
            </PopUpModal>
        </>
    );
};

export default RoomsList;
