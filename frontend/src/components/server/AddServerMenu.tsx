import { useState } from "react";
import FormInput from "../FormInput";
import api from "../../services/api";

const AddServerMenu = ({
    ref,
    hideMenu,
}: {
    ref: React.RefObject<HTMLDivElement | null>;
    hideMenu: () => void;
}) => {
    const [serverName, setServerName] = useState("");

    const handleServerCreate = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();
        if (!serverName) return;

        const res = await api.post("servers/", { name: serverName });
        if (res.status !== 201) return;
        hideMenu();
    };

    return (
        <div className="absolute flex w-full left-0 top-0 z-100 h-full justify-center items-center bg-[#00000095]">
            <div
                className="flex flex-col justify-between bg-[#141414] rounded-lg h-100 max-h-full w-120 p-10 gap-10"
                ref={ref}
            >
                <div className="flex items-center">
                    <h1 className="text-2xl text-center w-full">
                        Create Your Server
                    </h1>

                    <img
                        src="/close.png"
                        className="w-6 h-6 hover:cursor-pointer"
                        onClick={hideMenu}
                    />
                </div>

                <div className="grow flex flex-col gap-6">
                    <FormInput
                        id="name"
                        type="text"
                        label_text="Server Name"
                        className="bg-[#0e0e0e] border outline-0 border-[#2b2b2b] h-12 rounded-lg px-3"
                        onChange={(e) => setServerName(e.target.value)}
                        required
                    />

                    <button
                        className="p-2 rounded-xl bg-[#785D94] enabled:hover:bg-[#674f80] enabled:active:bg-[#5f4976] enabled:hover:cursor-pointer disabled:bg-[#37234c]"
                        onClick={handleServerCreate}
                        disabled={!serverName}
                    >
                        Create
                    </button>
                </div>

                <h1 className="text-md text-center w-full flex justify-around">
                    <div className="flex gap-1">
                        Already have an invite?
                        <span className="font-extrabold text-[#785D94] hover:cursor-pointer hover:underline">
                            Join Server
                        </span>
                    </div>
                </h1>
            </div>
        </div>
    );
};

export default AddServerMenu;
