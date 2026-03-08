import { Outlet } from "react-router";
import FriendsSidebar from "../components/FriendsSidebar";

const FriendsLayout = () => {
    return (
        <>
            <aside className="w-78 bg-(--bg-secondary) border-r-(--border-color) border-r hidden md:block">
                <FriendsSidebar />
            </aside>
            <main className="w-dvw">
                <Outlet />
            </main>
        </>
    );
};

export default FriendsLayout;
