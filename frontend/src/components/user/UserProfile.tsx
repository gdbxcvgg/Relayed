import { useEffect, useState } from "react";
import type { UserType } from "../../types/user";
import api from "../../services/api";
import UserAvatar from "./UserAvatar";

const UserProfile = ({ userId }: { userId: string }) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await api.get<UserType>(`/users/${userId}`);
            if (res.status !== 200) return;
            setUser(res.data);
        };

        fetchUser();
    }, [userId]);

    return (
        <div className="flex flex-col mb-10">
            <div className="w-160 h-24 sm:h-32 flex bg-[#363636] sm:rounded-t-xl pt-12 sm:pt-16 px-6">
                <UserAvatar user={user} size="size-24 sm:size-32 text-3xl" />
            </div>
            <div className="pt-15 sm:pt-19 px-6 flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row justify-between gap-5 w-full">
                    <div>
                        <div className="text-2xl font-bold">
                            {user?.display_name ?? user?.username}
                        </div>
                        <div className="text-xs">@ {user?.username}</div>
                    </div>

                    <div className="flex gap-2">
                        <button className="flex gap-1 items-center text-sm bg-[#45396c] py-1.5 px-3.5 rounded-lg font-semibold hover:cursor-pointer hover:bg-[#3f3463] active:bg-[#3a305a]">
                            <img src="/add-friend.png" className="size-4" />
                            <div>Add Friend</div>
                        </button>

                        <button className="flex gap-1 items-center text-sm bg-[#3c3c3c] py-3 px-3 rounded-lg font-semibold hover:cursor-pointer hover:bg-[#363636] active:bg-[#2e2e2e]">
                            <img src="/message.png" className="size-4" />
                        </button>
                    </div>
                </div>
                <div>
                    <div className="text-sm">Member Since</div>
                    <div className="text-xs">-- ---- ----</div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
