import { Link } from "react-router";
import ServersList from "./ServersList";

const ServerSidebar = () => {
    return (
        <div className="flex flex-row h-dvh p-3">
            <div className="w-20 border-r border-r-(--border-color) flex flex-col gap-5">
                <Link to="/app">Home</Link>
                <ServersList />
            </div>
            <div>Channels List</div>
        </div>
    );
};

export default ServerSidebar;
