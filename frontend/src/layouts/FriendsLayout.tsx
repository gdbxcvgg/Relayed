import { Outlet } from "react-router";
import FriendsSidebar from "../components/FriendsSidebar";
import useView from "../hooks/useView";

const FriendsLayout = () => {
    const { view } = useView();

    return (
        <>
            <aside
                className={`${view === "menu" ? "block" : "hidden"} md:block w-full md:w-78 bg-(--bg-secondary) border-r-(--border-color) border-r`}
            >
                <FriendsSidebar />
            </aside>
            <main
                className={`${view === "chat" ? "block" : "hidden"} md:block w-dvw`}
            >
                <Outlet />
            </main>
        </>
    );
};

export default FriendsLayout;
