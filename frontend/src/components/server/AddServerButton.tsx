import { useState } from "react";
import PopUpModal from "../PopUpModal";
import AddServerMenu from "./AddServerMenu";
import JoinServerMenu from "./JoinServerMenu";

const AddServerButton = () => {
    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState<"add" | "join">("add");

    const onClose = () => {
        setOpen(false);
        setMenu("add");
    };

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="bg-[#785D94] hover:bg-[#4d3c5f] w-[50px] h-[50px] flex flex-col justify-around items-center rounded-lg min-h-[50px]"
            >
                <img src="/plus.png" className="w-8 h-8" />
            </div>

            {menu === "add" && (
                <PopUpModal open={open} onClose={onClose}>
                    <AddServerMenu
                        onClose={onClose}
                        switchMenu={() => setMenu("join")}
                    />
                </PopUpModal>
            )}

            {menu === "join" && (
                <PopUpModal open={open} onClose={onClose}>
                    <JoinServerMenu
                        onClose={onClose}
                        switchMenu={() => setMenu("add")}
                    />
                </PopUpModal>
            )}
        </>
    );
};

export default AddServerButton;
