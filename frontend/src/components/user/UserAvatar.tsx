import type { UserType } from "../../types/user";
import PresenceStatus from "./PresenceStatus";

const UserAvatar = ({
    user,
    presence = false,
    size,
}: {
    user?: UserType | null;
    presence?: boolean;
    size?: string;
}) => {
    if (!user) return null;
    return (
        <div className="flex">
            <div className={`relative ${size ? size : "size-9"}`}>
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt="avatar"
                        className={`rounded-full ${size ? size : "size-9"}`}
                    />
                ) : (
                    <div
                        className={`bg-[#272727] rounded-full flex justify-center items-center ${size ? size : "size-9"}`}
                    >
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
