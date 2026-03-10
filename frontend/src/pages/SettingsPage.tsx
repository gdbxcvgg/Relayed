import { use, useState } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../contexts/AuthContext";

type CurrentMenuType = "my_account" | "other";

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

const SettingsPage = () => {
    const navigate = useNavigate();

    const [currentMenu, setCurrentMenu] =
        useState<CurrentMenuType>("my_account");

    const { logout } = use(AuthContext);

    return (
        <div className="flex ">
            <aside className="w-78 border-r border-r-(--border-color) bg-(--bg-secondary) flex flex-col p-4 gap-3 grow overflow-y-auto [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-[3px]">
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
                            setCurrentMenu("my_account");
                        }}
                        currentMenu={currentMenu}
                        id="my_account"
                    >
                        <img src="/person.png" className="w-5 h-5" />
                        My Account
                    </MenuItem>

                    <MenuItem
                        onClick={() => {
                            setCurrentMenu("other");
                        }}
                        currentMenu={currentMenu}
                        id="other"
                    >
                        <img src="/gear.png" className="w-5 h-5" />
                        Other
                    </MenuItem>
                </div>

                <MenuDivisor />

                <MenuItem onClick={logout} currentMenu={currentMenu}>
                    <img src="/logout.png" className="w-5 h-5" />
                    <span className="text-[#ca2828]">Log Out</span>
                </MenuItem>
            </aside>
        </div>
    );
};

export default SettingsPage;
