import { useState } from "react";
import useServer from "../../hooks/useServer";
import type { ServerMemberType } from "../../types/server";
import PopUpModal from "../PopUpModal";
import UserAvatar from "../user/UserAvatar";
import UserProfile from "../user/UserProfile";

const Member = ({ member }: { member: ServerMemberType }) => {
    const { server } = useServer();
    const [showProfile, setShowProfile] = useState(false);

    const closeProfile = () => setShowProfile(false);

    return (
        <>
            <div
                className="flex gap-2 items-center py-1 rounded-lg hover:bg-[#121212] active:bg-[#161616] hover:cursor-pointer"
                onClick={() => setShowProfile(true)}
            >
                <UserAvatar user={member.user} presence />
                <div className="flex flex-row items-center gap-1">
                    {member.user.display_name ?? member.user.username}
                    {server?.owner.id === member.user.id && (
                        <div className="w-5 h-5">
                            <img src="/crown.png" />
                        </div>
                    )}
                </div>
            </div>

            <PopUpModal
                open={showProfile}
                onClose={closeProfile}
                padding={false}
            >
                <UserProfile userId={member.user.id} />
            </PopUpModal>
        </>
    );
};

const MemberList = () => {
    const { server } = useServer();

    return (
        <div className="flex flex-col gap-1">
            {server?.members?.map((member) => (
                <Member key={member.user.id} member={member} />
            ))}
        </div>
    );
};

export default MemberList;
