import { Outlet } from "react-router";
import ServerSidebar from "../components/ServerSidebar";

const ServerLayout = () => {
    return (
        <>
            <aside className="w-78 bg-(--bg-secondary) border-r-(--border-color) border-r hidden md:block">
                <ServerSidebar />
            </aside>
            <main className="w-dvw">
                <Outlet />
            </main>
        </>
    );
};

export default ServerLayout;
