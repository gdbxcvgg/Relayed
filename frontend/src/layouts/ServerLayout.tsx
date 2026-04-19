import { Outlet } from "react-router";
import ServerSidebar from "../components/ServerSidebar";
import useView from "../hooks/useView";

const ServerLayout = () => {
    const { view } = useView();

    return (
        <>
            <aside
                className={`${view === "menu" ? "block" : "hidden"} md:block w-full md:w-78 bg-(--bg-secondary) border-r-(--border-color) border-r`}
            >
                <ServerSidebar />
            </aside>
            <main
                className={`${view === "chat" ? "block" : "hidden"} md:block w-full md:flex-1 min-w-0`}
            >
                <Outlet />
            </main>
        </>
    );
};

export default ServerLayout;
