import useServer from "../hooks/useServer";
import RoomsList from "./RoomsList";
import BaseSidebar from "./BaseSidebar";

const ServerSidebar = () => {
    const { server } = useServer();
    if (!server) return null;

    return (
        <BaseSidebar>
            <div className="h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <div>{server.name}</div>
            </div>
            <div className="p-3">
                <RoomsList />
            </div>
        </BaseSidebar>
    );
};

export default ServerSidebar;
