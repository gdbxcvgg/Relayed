import { Outlet } from "react-router";

const DefaultLayout = () => {
    return (
        <div className="bg-(--bg-main) h-dvh text-white flex flex-row max-w-dvw w-dvw">
            <Outlet />
        </div>
    );
};

export default DefaultLayout;
