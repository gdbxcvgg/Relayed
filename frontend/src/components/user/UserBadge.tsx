import { Link } from "react-router";
import useUser from "../../hooks/useUser";

const UserBadge = () => {
    const { user } = useUser();

    return (
        <>
            <div className="bg-(--bg-main) h-16 mb-3 mx-3 flex gap-2 px-3 items-center justify-between rounded-lg">
                <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                    {user?.username.slice(0, 1)}
                </div>
                <div className="grow max-w-46">
                    <div className="text-sm truncate">
                        {user?.display_name ?? user?.username}
                    </div>
                    <div className="text-xs">[presence status...]</div>
                </div>
                <Link to="settings">
                    <img src="/gear.png" className="min-w-5 w-5 h-5" />
                </Link>
            </div>
        </>
    );
};

export default UserBadge;
