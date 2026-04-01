import { Link } from "react-router";
import ServersList from "./ServersList";
import AddServerButton from "./server/AddServerButton";
import UserBadge from "./user/UserBadge";

const BaseSidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row grow min-h-0">
                <div className="w-20 min-w-20 border-r border-r-(--border-color) flex flex-col gap-5 items-center p-3 scrollbar-hide overflow-y-scroll">
                    <Link
                        to={`/app`}
                        className="bg-[#785D94] hover:bg-[#4d3c5f] w-[50px] h-[50px] flex flex-col justify-around rounded-lg min-h-[50px]"
                    >
                        <div className="text-center">Home</div>
                    </Link>

                    <div className="w-[50px] h-0.25 min-h-0.25 bg-[#323232]"></div>

                    <ServersList />

                    <AddServerButton />
                </div>
                <div className="w-full md:w-58 flex flex-col scrollbar-hide overflow-y-scroll">
                    {children}
                </div>
            </div>

            <div className="hidden md:block">
                <UserBadge />
            </div>
        </div>
    );
};

export default BaseSidebar;
