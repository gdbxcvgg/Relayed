import type { UserType } from "../../types/user";
import PresenceStatus from "./PresenceStatus";

const UserAvatar = ({
    user,
    presence = false,
}: {
    user?: UserType | null;
    presence?: boolean;
}) => {
    if (!user) return null;
    return (
        <div className="flex">
            <div className="relative w-9 h-9">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-9 h-9 rounded-4xl"
                    />
                ) : (
                    <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                        {user.username.slice(0, 1)}
                    </div>
                )}

                {presence && (
                    <div className="absolute bottom-0 right-0">
                        <PresenceStatus status={user.presence ?? "offline"} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserAvatar;
