import { Link } from "react-router";
import ServersList from "./ServersList";

const FriendsSidebar = () => {
    return (
        <div className="flex flex-row h-dvh">
            <div className="w-25 border-r border-r-(--border-color) flex flex-col gap-5 items-center p-3 scrollbar-hide overflow-y-scroll">
                <Link
                    to={`/app`}
                    className="bg-[#785D94] hover:bg-[#4d3c5f] w-[50px] h-[50px] flex flex-col justify-around rounded-lg min-h-[50px]"
                >
                    <div className="text-center">Home</div>
                </Link>

                <div className="w-[50px] h-0.25 min-h-0.25 bg-[#323232]"></div>

                <ServersList />
            </div>

            <div className="w-full">
                <div className="h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                    <div>Friends List</div>
                </div>
                <div className="p-3"></div>
            </div>
        </div>
    );
};

export default FriendsSidebar;
