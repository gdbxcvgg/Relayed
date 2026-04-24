import useServer from "../../hooks/useServer";
import { useEffect, useState } from "react";
import type { RoomNodeType, RoomType } from "../../types/room";
import useUser from "../../hooks/useUser";
import PopUpModal from "../PopUpModal";
import CreateRoomPopup from "../server/CreateRoomPopup";
import CategoryHead from "./CategoryHead";
import Room from "./Room";

const SERVER_TEXT = 1;
const SERVER_CATEGORY = 2;

const RoomList = () => {
    const { server } = useServer();
    const { user } = useUser();

    const isServerOwner = server?.owner.id === user?.id;

    const [roomGraph, setRoomGraph] = useState<Record<string, RoomNodeType>>(
        {},
    );

    const [showCreateRoomMenu, setShowCreateRoomMenu] = useState(false);
    const [parentCategory, setParentCategory] = useState<RoomType | null>(null);

    const toggleCategoryHidden = (roomId: string) => {
        setRoomGraph((prev) => {
            const updated = { ...prev };

            if (!updated[roomId]) return prev;

            updated[roomId] = {
                ...updated[roomId],
                hidden: !updated[roomId].hidden,
            };

            return updated;
        });
    };

    const handleRoomCreate = (category: RoomType | null) => {
        setParentCategory(category);
        setShowCreateRoomMenu(true);
    };

    useEffect(() => {
        const constructGraph = () => {
            if (!server || !server.rooms) return;

            const roomMap: Record<string, RoomNodeType> = {
                root: { room: null, children: [], hidden: false },
            };

            server.rooms.forEach((room) => {
                if (room.room_type === SERVER_CATEGORY) {
                    roomMap[room.id] = {
                        room: room,
                        children: [],
                        hidden: false,
                    };
                } else if (room.room_type === SERVER_TEXT && !room.parent) {
                    roomMap["root"].children.push(room);
                }
            });

            server.rooms.forEach((room) => {
                if (room.room_type === SERVER_TEXT && room.parent) {
                    roomMap[room.parent].children.push(room);
                }
            });

            if (roomMap.root.children.length === 0) delete roomMap.root;

            setRoomGraph(roomMap);
        };

        constructGraph();
    }, [server]);

    return (
        <>
            {Object.values(roomGraph).map((category) => (
                <div key={category.room?.id ?? "root"} className="mb-6">
                    <CategoryHead
                        category={category}
                        isServerOwner={isServerOwner}
                        toggleHidden={toggleCategoryHidden}
                        handleCreate={handleRoomCreate}
                    />

                    <div className="flex flex-col gap-1">
                        {!category.hidden &&
                            category.children.map((room) => (
                                <Room key={room.id} room={room} />
                            ))}
                    </div>
                </div>
            ))}

            {isServerOwner && (
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

export default RoomList;
