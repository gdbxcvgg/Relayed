import { useState } from "react";
import PopUpModal from "../PopUpModal";
import AddServerMenu from "./AddServerMenu";

const AddServerButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setOpen(true)}
                className="bg-[#785D94] hover:bg-[#4d3c5f] w-[50px] h-[50px] flex flex-col justify-around items-center rounded-lg min-h-[50px]"
            >
                <img src="/plus.png" className="w-8 h-8" />
            </div>

            <PopUpModal open={open} onClose={() => setOpen(false)}>
                <AddServerMenu onClose={() => setOpen(false)} />
            </PopUpModal>
        </>
    );
};

export default AddServerButton;
