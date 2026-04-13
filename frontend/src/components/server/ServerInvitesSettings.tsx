import { useEffect, useState } from "react";
import type { ServerInviteType } from "../../types/server";
import api from "../../services/api";
import useServer from "../../hooks/useServer";
import UserAvatar from "../user/UserAvatar";
import useView from "../../hooks/useView";

const ServerInviteSettings = () => {
    const [invites, setInvites] = useState<ServerInviteType[] | null>(null);

    const { server } = useServer();
    const { openMenu } = useView();

    useEffect(() => {
        const fetchInvites = async () => {
            const res = await api.get<ServerInviteType[]>(
                `servers/${server?.id}/invites`,
            );
            setInvites(res.data);
        };

        fetchInvites();
    }, [server]);

    return (
        <div className="flex flex-col h-dvh items-center">
            <div className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <h1 className="flex text-lg font-bold items-center gap-4">
                    <img
                        src="/arrow-left.png"
                        className="md:hidden w-6 h-7"
                        onClick={openMenu}
                    />
                    Server Invites
                </h1>
            </div>
            <div className="grow p-10 flex flex-col gap-10 w-full md:w-3/4">
                <div className="bg-(--bg-secondary) border border-(--border-color) rounded-lg">
                    <h1 className="border-b border-b-(--border-color) p-3 text-lg font-extrabold">
                        Recent Invites [{invites?.length} Total]
                    </h1>

                    <div className="flex text-lg font-extrabold p-3">
                        <div className="w-4/12">Inviter</div>
                        <div className="w-3/12">Invite Code</div>
                        <div className="w-2/12">Uses</div>
                        <div className="w-3/12">Expires</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {invites
                            ?.slice(0)
                            .reverse()
                            .map((invite) => (
                                <div
                                    key={invite.id}
                                    className="flex border-b border-b-(--border-color) h-16 text-sm items-center p-3"
                                >
                                    <div className="w-4/12">
                                        <div className="w-5/12 flex items-center gap-2">
                                            <UserAvatar user={invite.inviter} />
                                            {invite.inviter.username}
                                        </div>
                                    </div>
                                    <div className="w-3/12">{invite.code}</div>
                                    <div className="w-2/12">
                                        {invite.uses}
                                        {invite.max_uses &&
                                            `/${invite.max_uses}`}
                                    </div>
                                    <div className="w-3/12">
                                        {invite.expires_at ?? "never"}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerInviteSettings;
