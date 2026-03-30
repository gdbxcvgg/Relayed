import { createPortal } from "react-dom";

type ContextMenuProps = {
    open: boolean;
    x: number;
    y: number;
    onClose: () => void;
    children: React.ReactNode;
};

const ContextMenu = ({ open, x, y, onClose, children }: ContextMenuProps) => {
    if (!open) return null;

    return createPortal(
        <div
            onClick={onClose}
            onContextMenu={(e) => {
                e.preventDefault();
                onClose();
            }}
            className="text-white fixed inset-0 z-100"
        >
            <div
                className="text-white flex flex-col absolute bg-(--bg-main) border-(--border-color) border rounded-lg px-2 py-3 items-center min-w-8 justify-center gap-2"
                style={{
                    top: y,
                    left: x,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.getElementById("root") ?? document.body,
    );
};

export default ContextMenu;
