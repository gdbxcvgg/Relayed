import { useState } from "react";
import FormInput from "../FormInput";
import type { RoomType } from "../../types/room";
import api from "../../services/api";

const RoomSettingsPopup = ({
    onClose,
    room,
}: {
    onClose: () => void;
    room: RoomType;
}) => {
    const [roomName, setRoomName] = useState(room.name);

    const handleUpdate = async () => {
        const res = await api.put(`rooms/${room.id}`, { name: roomName });

        if (res.status !== 200) return;
        onClose();
    };

    const handleDelete = async () => {
        const res = await api.delete(`rooms/${room.id}`);

        if (res.status !== 204) return;

        onClose();
    };

    return (
        <div className="flex flex-col gap-12 grow w-100">
            <h1 className="text-lg font-bold">Channel Settings</h1>
            <FormInput
                id="name"
                type="text"
                label_text="Channel Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
            />

            <div className="flex flex-col gap-2">
                <button
                    className="p-2 rounded-xl bg-[#785D94] enabled:hover:bg-[#674f80] enabled:active:bg-[#5f4976] enabled:hover:cursor-pointer disabled:bg-[#37234c]"
                    onClick={handleUpdate}
                    disabled={room.name === roomName}
                >
                    Update
                </button>

                <button
                    className="p-2 rounded-xl bg-[#913a3a] enabled:hover:bg-[#803535] enabled:active:bg-[#782929] enabled:hover:cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default RoomSettingsPopup;
