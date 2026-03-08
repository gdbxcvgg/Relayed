import useServer from "../hooks/useServer";
import RoomsList from "./RoomsList";
import BaseSidebar from "./BaseSidebar";
import ServerContextMenu from "./ServerContextMenu";
import { useEffect, useRef, useState } from "react";

const ServerSidebar = () => {
    const { server } = useServer();

    const [showContextMenu, setShowContextMenu] = useState(false);
    const contextMenuRef = useRef<HTMLDivElement>(null);
    const arrowDownRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        e.preventDefault();
        setShowContextMenu(true);
    };

    const hideContextMenu = () => setShowContextMenu(false);

    useEffect(() => {
        const handleClick = (e: PointerEvent) => {
            if (
                !contextMenuRef.current?.contains(e.target as Node) &&
                !arrowDownRef.current?.contains(e.target as Node)
            )
                setShowContextMenu(false);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <BaseSidebar>
            <div
                className="h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color) relative"
                onContextMenu={handleContextMenu}
            >
                <div className="flex items-center w-full justify-between">
                    <div className="truncate">{server?.name}</div>
                    <div ref={arrowDownRef}>
                        <img
                            src="/arrow-down.png"
                            className="min-w-5 w-5 h-6 hover:cursor-pointer"
                            onClick={() => setShowContextMenu(true)}
                        />
                    </div>
                </div>
                <div ref={contextMenuRef}>
                    {server && (
                        <ServerContextMenu
                            server={server}
                            show={showContextMenu}
                            hideContextMenu={hideContextMenu}
                        />
                    )}
                </div>
            </div>
            <div className="p-3">
                <RoomsList />
            </div>
        </BaseSidebar>
    );
};

export default ServerSidebar;
