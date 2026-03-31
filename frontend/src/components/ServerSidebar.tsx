import useServer from "../hooks/useServer";
import RoomsList from "./server/RoomsList";
import BaseSidebar from "./BaseSidebar";
import ServerContextMenu from "./server/ServerContextMenu";
import { useState } from "react";
import ContextMenu from "./ContextMenu";
import ServerInvitePopup from "./ServerInvitePopup";
import PopUpModal from "./PopUpModal";

type MenuStateType = {
    visible: boolean;
    x: number;
    y: number;
};

const ServerSidebar = () => {
    const { server } = useServer();

    const [menu, setMenu] = useState<MenuStateType>({
        visible: false,
        x: 0,
        y: 0,
    });

    const [showInvite, setShowInvite] = useState(false);

    const handleMenu = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();

        const x = Math.min(e.clientX, window.innerWidth - 150);
        const y = Math.min(e.clientY, window.innerHeight - 100);

        setMenu({ visible: true, x: x, y: y });
    };

    const hideContextMenu = () => setMenu((p) => ({ ...p, visible: false }));

    return (
        <BaseSidebar>
            <div
                className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color) relative"
                onContextMenu={handleMenu}
            >
                <div className="flex items-center w-full justify-between">
                    <div className="truncate">{server?.name}</div>
                    <div>
                        <img
                            src="/arrow-down.png"
                            className="min-w-5 w-5 h-6 hover:cursor-pointer"
                            onClick={handleMenu}
                        />
                    </div>
                </div>
            </div>
            <div className="p-3">
                <RoomsList />
            </div>

            {server && (
                <ContextMenu
                    open={menu.visible}
                    x={menu.x}
                    y={menu.y}
                    onClose={hideContextMenu}
                >
                    <ServerContextMenu
                        server={server}
                        onClose={hideContextMenu}
                        handleServerInvite={() => {
                            setShowInvite(true);
                            hideContextMenu();
                        }}
                    />
                </ContextMenu>
            )}

            <PopUpModal open={showInvite} onClose={() => setShowInvite(false)}>
                <ServerInvitePopup />
            </PopUpModal>
        </BaseSidebar>
    );
};

export default ServerSidebar;
