import { useEffect, useState } from "react";
import useView from "../../hooks/useView";
import type { ServerBan } from "../../types/server";
import useServer from "../../hooks/useServer";
import api from "../../services/api";

const ServerBanSettings = () => {
    const [bans, setBans] = useState<ServerBan[]>([]);

    const { server } = useServer();
    const { openMenu } = useView();

    useEffect(() => {
        const getBans = async () => {
            if (!server) return;

            const res = await api.get<ServerBan[]>(
                `/servers/${server.id}/bans`,
            );

            if (res.status !== 200) return;

            setBans(res.data);
        };
        getBans();
    }, [server]);

    const unbanMember = async (userId: string) => {
        if (!server) return;

        await api.delete(`/servers/${server.id}/bans/${userId}`);
    };

    return (
        <div className="flex flex-col h-dvh items-center">
            <div className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <h1 className="flex text-lg font-bold items-center gap-4">
                    <img
                        src="/arrow-left.png"
                        className="md:hidden w-6 h-7"
                        onClick={openMenu}
                    />
                    Server Bans
                </h1>
            </div>
            <div className="grow p-10 flex flex-col gap-10 w-full md:w-3/4">
                <div className="bg-(--bg-secondary) border border-(--border-color) rounded-lg">
                    <h1 className="border-b border-b-(--border-color) p-3 text-lg font-extrabold">
                        Recent Bans [{bans.length} Total]
                    </h1>

                    <div className="flex flex-col gap-3">
                        {bans.map((ban) => (
                            <div
                                key={ban.user.id}
                                className="flex border-b border-b-(--border-color) h-16 text-sm items-center p-3 justify-between"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                                        {ban.user.username.slice(0, 1)}
                                    </div>
                                    <div className="flex flex-col">
                                        <div>
                                            {ban.user.display_name ??
                                                ban.user.username}
                                        </div>
                                        <div className="text-xs">
                                            {ban.user.username}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => unbanMember(ban.user.id)}
                                    className="text-red-700 cursor-pointer hover:text-red-800 active:text-red-900"
                                >
                                    Revoke Ban
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerBanSettings;
