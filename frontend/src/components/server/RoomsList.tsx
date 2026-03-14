import { Link } from "react-router";
import useServer from "../../hooks/useServer";
import { useEffect, useState } from "react";
import type { RoomType } from "../../types/room";

interface RoomNode extends RoomType {
    children: RoomType[];
}

const RoomsList = () => {
    const { server } = useServer();
    const [roomTree, setRoomTree] = useState<Record<string, RoomNode>>({});

    useEffect(() => {
        const constructRoomTree = () => {
            if (!server) return;

            const roomMap: Record<string, RoomNode> = {};

            server.rooms?.forEach((room) => {
                roomMap[room.id] = { ...room, children: [] };
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

    return (
        <>
            {Object.values(roomTree).map((root) => (
                <div key={root.id} className="mb-6">
                    {root.room_type === 1 && (
                        <Link
                            key={root.id}
                            to={`/channels/${server?.id}/${root.id}`}
                        >
                            <div className="hover:bg-[#121212] active:bg-[#181818] rounded-md">
                                # {root.name}
                            </div>
                        </Link>
                    )}

                    {root.room_type === 2 && (
                        <>
                            <div>{root.name}</div>
                            <div className="flex flex-col gap-1">
                                {root.children.map((room) => (
                                    <Link
                                        to={`/channels/${server?.id}/${room.id}`}
                                        key={room.id}
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
        </>
    );
};

export default RoomsList;
