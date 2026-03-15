import { createPortal } from "react-dom";

type PopUpProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const PopUpModal = ({ open, onClose, children }: PopUpProps) => {
    return createPortal(
        <div
            onClick={onClose}
            className={`text-white fixed inset-0 z-100 flex justify-center items-center ${open ? "visible bg-black/80" : "invisible"}`}
        >
            <div
                className="relative bg-(--bg-main) rounded-xl shadow px-10 py-12 h-dvh w-dvw sm:h-auto sm:w-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src="/close.png"
                    className="absolute top-13 right-11 w-6 h-6 hover:cursor-pointer"
                    onClick={onClose}
                />
                {children}
            </div>
        </div>,
        document.getElementById("root") ?? document.body,
    );
};

export default PopUpModal;
