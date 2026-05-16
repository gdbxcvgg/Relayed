import useUser from "../hooks/useUser";
import BaseSidebar from "./BaseSidebar";
import DM from "./DM";

const FriendsSidebar = () => {
    const { dmChannels } = useUser();

    return (
        <BaseSidebar>
            <div className="h-[50px] shrink-0 w-full flex items-center px-3 border-b border-b-(--border-color)">
                <div>Direct Messages</div>
            </div>
            <div className="scrollbar-hide overflow-y-scroll p-3">
                <div className="flex flex-col gap-3">
                    {dmChannels?.map((room) => (
                        <DM room={room} key={room.id} />
                    ))}
                </div>
            </div>
        </BaseSidebar>
    );
};

export default FriendsSidebar;
