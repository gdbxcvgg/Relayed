import { Link } from "react-router";
import useUser from "../../hooks/useUser";
import UserAvatar from "./UserAvatar";

const UserBadge = () => {
    const { user } = useUser();

    return (
        <>
            <div className="bg-(--bg-main) h-16 mb-3 mx-3 flex gap-3 px-3 items-center justify-between rounded-lg">
                <UserAvatar user={user} presence />

                <div className="grow">
                    <div className="max-w-46">
                        <div className="text-sm truncate">
                            {user?.display_name ?? user?.username}
                        </div>
                        <div className="text-xs">[presence status...]</div>
                    </div>
                </div>

                <Link to="settings">
                    <img src="/gear.png" className="min-w-5 w-5 h-5" />
                </Link>
            </div>
        </>
    );
};

export default UserBadge;
