import { useNavigate } from "react-router";
import type { ServerType } from "../contexts/ServerContext";
import api from "../services/api";

interface ServerContextMenuProps {
    server: ServerType;
    show: boolean;
    hideContextMenu: () => void;
}

const MenuItem = ({
    text,
    onClick,
    className,
    disabled,
}: {
    text: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-50 h-8 enabled:hover:bg-[#202020] enabled:hover:cursor-pointer enabled:active:bg-[#323232] rounded-md flex items-center px-1 disabled:text-[#2e2e2e]"
        >
            <div className={className}>{text}</div>
        </button>
    );
};

const ServerContextMenu = ({
    server,
    show,
    hideContextMenu,
}: ServerContextMenuProps) => {
    const navigate = useNavigate();

    const handleLeave = async () => {
        const res = await api.delete(`users/@me/servers/${server.id}/member`);
        if (res.status !== 204) return;
        hideContextMenu();
        navigate("/app", { replace: true });
    };
    return (
        show && (
            <div className="flex flex-col absolute -right-28 top-6 z-100 bg-(--bg-main) border-(--border-color) border rounded-lg px-2 py-3 items-center min-w-8 justify-center gap-2">
                <MenuItem
                    text="Copy Server ID"
                    onClick={hideContextMenu}
                    disabled
                />
                <MenuItem
                    text="Invite to Server"
                    onClick={hideContextMenu}
                    disabled
                />
                <MenuItem
                    text="Leave Server"
                    onClick={handleLeave}
                    className="text-red-500 hover:text-red-600"
                />
            </div>
        )
    );
};

export default ServerContextMenu;
