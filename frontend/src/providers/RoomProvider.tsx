import { useEffect, useState } from "react";
import RoomContext from "../contexts/RoomContext";
import useGateway from "../hooks/useGateway";
import useServer from "../hooks/useServer";
import type { RoomType } from "../types/room";
import useUser from "../hooks/useUser";
import { RoomTypeChoices } from "../shared/constants";

const RoomProvider = ({ children }: { children: React.ReactNode }) => {
    const [room, _setRoom] = useState<RoomType | null>(null);

    const { sendJsonMessage } = useGateway();
    const { server } = useServer();
    const { dmChannels } = useUser();

    const setRoom = async (roomId: string) => {
        const room = server?.rooms?.find((r) => r.id === roomId);
        if (!room) {
            const room = dmChannels?.find((r) => r.id === roomId);
            _setRoom(room ?? null);
        } else _setRoom(room ?? null);
    };

    useEffect(() => {
        if (!room) return;

        if (room.room_type === RoomTypeChoices.SERVER_TEXT)
            sendJsonMessage({
                opcode: 1,
                data: {
                    server_id: server?.id ?? "",
                    rooms: [
                        {
                            id: room.id,
                        },
                    ],
                },
            });
        else if (room.room_type === RoomTypeChoices.DM)
            sendJsonMessage({
                opcode: 1,
                data: {
                    rooms: [
                        {
                            id: room.id,
                        },
                    ],
                },
            });
    }, [room]);

    return <RoomContext value={{ room, setRoom }}> {children} </RoomContext>;
};

export default RoomProvider;
