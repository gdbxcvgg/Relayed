import { useState } from "react";
import FormInput from "../FormInput";
import api from "../../services/api";
import useServer from "../../hooks/useServer";

const CreateRoomPopup = ({ onClose }: { onClose: () => void }) => {
    const { server } = useServer();

    const [roomType, setRoomType] = useState("1");
    const [roomName, setRoomName] = useState("");

    if (!server) return null;

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await api.post(`servers/${server.id}/rooms`, {
            name: roomName,
            room_type: roomType,
        });

        if (res.status !== 201) return;
        onClose();
    };

    return (
        <div className="flex flex-col gap-12 grow w-100">
            <form className="flex flex-col gap-5" onSubmit={handleCreate}>
                <h1 className="text-2xl w-full">Create channel</h1>

                <p>Channel Type</p>

                <div className="flex gap-3">
                    <input
                        type="radio"
                        name="ch_type"
                        id="text"
                        className="hover:cursor-pointer"
                        onChange={(e) => setRoomType(e.target.value)}
                        checked
                        required
                    />
                    <label
                        htmlFor="text"
                        className="flex flex-col hover:cursor-pointer"
                    >
                        <p className="font-bold">Text</p>
                        <p className="text-xs">
                            Send messages, images and more
                        </p>
                    </label>
                </div>

                <div className="flex gap-3 text-[#606060]">
                    <input
                        type="radio"
                        name="ch_type"
                        id="voice"
                        value="3"
                        required
                        disabled
                        className="enabled:hover:cursor-pointer"
                        onChange={(e) => setRoomType(e.target.value)}
                    />
                    <label htmlFor="voice" className="flex flex-col ">
                        <p className="font-bold">Voice</p>
                        <p className="text-xs">Talk with your friends</p>
                    </label>
                </div>

                <FormInput
                    id="chn"
                    type="text"
                    label_text="Channel Name"
                    onChange={(e) => setRoomName(e.target.value)}
                    className="bg-[#0f0f0f] border-2 border-[#1C1C1C] h-12 rounded-lg px-3 outline-none mb-5"
                />

                <button
                    className="enabled:bg-sky-800 enabled:hover:bg-sky-900 enabled:hover:cursor-pointer w-50 h-10 rounded-md disabled:bg-[#081827]"
                    disabled={!roomName}
                >
                    Create Channel
                </button>
            </form>
        </div>
    );
};

export default CreateRoomPopup;
