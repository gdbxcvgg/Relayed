import { useNavigate, useParams } from "react-router";
import useServer from "../hooks/useServer";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import api from "../services/api";
import ServerProfileSettings from "../components/server/ServerProfileSettings";
import ServerMembersSettings from "../components/server/ServerMembersSettings";
import ServerInviteSettings from "../components/server/ServerInvitesSettings";
import useView from "../hooks/useView";
import ServerBanSettings from "../components/server/ServerBanSettings";

type CurrentMenuType = "profile" | "members" | "roles" | "invites" | "bans";

const MenuItem = ({
    children,
    onClick,
    currentMenu,
    id,
}: {
    children: React.ReactNode;
    onClick?: () => void;
    currentMenu: string;
    id?: CurrentMenuType;
}) => {
    return (
        <div className="hover:bg-(--bg-main) hover:cursor-pointer rounded-md font-semibold">
            <div
                className={
                    currentMenu === id
                        ? "bg-[#292929] p-2 rounded-md"
                        : "p-2 rounded-md"
                }
                onClick={onClick}
            >
                <div className="flex gap-4 items-center">{children}</div>
            </div>
        </div>
    );
};

const MenuDivisor = () => {
    return <div className="w-full h-0.25 min-h-0.25 bg-[#323232]"></div>;
};

const ServerSettingsPage = () => {
    const { serverId } = useParams();
    const { server, setServer } = useServer();
    const { user } = useUser();

    const navigate = useNavigate();
    const { view, openChat } = useView();

    const [currentMenu, setCurrentMenu] = useState<CurrentMenuType>("profile");

    useEffect(() => {
        if (!serverId) return;

        const loadServer = async () => {
            const res = await setServer(serverId);
            if (res === false) navigate("/channels/@me");
        };

        loadServer();
    }, [serverId, navigate]);

    useEffect(() => {
        if (!server || !user) return;

        if (server.owner.id !== user.id) navigate("/channels/@me");
    }, [server, user, navigate]);

    const deleteServer = async () => {
        if (!server) return;
        const res = await api.delete(`servers/${server.id}`);
        if (res.status !== 204) return;
        navigate("/channels/@me");
    };

    return (
        <div className="flex w-full">
            <aside
                className={`${view === "menu" ? "flex" : "hidden"} md:flex w-dvw md:w-78 min-w-78 border-r border-r-(--border-color) bg-(--bg-secondary) flex flex-col p-4 gap-3 grow overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-[3px]`}
            >
                <MenuItem
                    onClick={() => navigate("/app")}
                    currentMenu={currentMenu}
                >
                    <img src="/arrow-left.png" className="w-5 h-5" />
                    Go Back
                </MenuItem>

                <MenuDivisor />

                <div className="flex flex-col gap-2">
                    <MenuItem
                        onClick={() => {
                            setCurrentMenu("profile");
                            openChat();
                        }}
                        currentMenu={currentMenu}
                        id="profile"
                    >
                        <img src="/detail.png" className="w-5 h-5" />
                        Server Profile
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setCurrentMenu("members");
                            openChat();
                        }}
                        currentMenu={currentMenu}
                        id="members"
                    >
                        <img src="/member.png" className="w-5 h-5" />
                        Members
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setCurrentMenu("invites");
                            openChat();
                        }}
                        currentMenu={currentMenu}
                        id="invites"
                    >
                        <img src="/invite.png" className="w-5 h-5" />
                        Invites
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setCurrentMenu("bans");
                            openChat();
                        }}
                        currentMenu={currentMenu}
                        id="bans"
                    >
                        <img src="/ban.png" className="w-5 h-5" />
                        Bans
                    </MenuItem>
                </div>

                <MenuDivisor />

                <MenuItem onClick={deleteServer} currentMenu={currentMenu}>
                    <img src="/trash.png" className="w-5 h-5" />
                    <span className="text-[#ca2828]">Delete Server</span>
                </MenuItem>
            </aside>
            <main
                className={`${view === "chat" ? "block" : "hidden"} md:block md:w-full grow overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-[3px]`}
            >
                {currentMenu === "profile" && <ServerProfileSettings />}
                {currentMenu === "members" && <ServerMembersSettings />}
                {currentMenu === "invites" && <ServerInviteSettings />}
                {currentMenu === "bans" && <ServerBanSettings />}
            </main>
        </div>
    );
};

export default ServerSettingsPage;
