import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";
import useUser from "../hooks/useUser";

import type { ServerInviteType } from "../types/server";

const InvitePage = () => {
    const { inviteCode } = useParams();
    const [invite, setInvite] = useState<ServerInviteType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { user, servers } = useUser();
    const navigate = useNavigate();

    const handleAccept = async () => {
        const res = await api.post(`invites/${inviteCode}`);
        if (res.status !== 200) return;
        navigate("/app", { replace: true });
    };

    useEffect(() => {
        if (!servers || !invite) return;
        const already_member = servers.some(
            (server) => server.id === invite.server?.id,
        );
        if (already_member)
            navigate(`/channels/${invite.server?.id}`, { replace: true });
    }, [servers, invite, navigate]);

    useEffect(() => {
        const getInvite = async () => {
            const res = await api.get<ServerInviteType>(
                `invites/${inviteCode}`,
            );
            if (res.status !== 200) return;

            setInvite(res.data);
        };

        getInvite().then(() => {
            setLoading(false);
        });
    }, [inviteCode]);

    if (loading) return null;

    if (!invite) return <>Bad Invite</>;

    return (
        <div className="flex flex-row items-center justify-center w-full">
            <div className="flex bg-[#141414] h-80 w-160 rounded-lg">
                <div className="flex flex-col items-center w-full mt-5 gap-4">
                    {invite.server?.icon ? (
                        <img
                            src={invite.server.icon}
                            className="rounded-xl w-16 h-16"
                        />
                    ) : (
                        <div className="bg-[#272727] w-16 h-16 rounded-xl flex justify-center items-center">
                            {invite.server?.name.slice(0, 3)}
                        </div>
                    )}
                    <p className="text-sm">You have been invited to join</p>
                    <h1 className="text-2xl">{invite.server?.name}</h1>

                    <button
                        className="bg-[#785D94] hover:bg-[#634c7c] active:hover:bg-[#473659] hover:cursor-pointer rounded-lg p-3 w-3/4 mt-4"
                        onClick={handleAccept}
                    >
                        Accept as {user?.display_name ?? user?.username}
                    </button>

                    <button
                        className="hover:cursor-pointer rounded-lg p-1 hover:underline"
                        onClick={() => navigate("/app", { replace: true })}
                    >
                        No, thanks
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvitePage;
