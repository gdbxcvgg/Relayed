import BaseSidebar from "./BaseSidebar";

const FriendsSidebar = () => {
    return (
        <BaseSidebar>
            <div className="h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <div>Friends List</div>
            </div>
            <div className="p-3"></div>
        </BaseSidebar>
    );
};

export default FriendsSidebar;
