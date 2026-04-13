import { useEffect, useState } from "react";
import useServer from "../../hooks/useServer";
import FormInput from "../FormInput";
import api from "../../services/api";
import useView from "../../hooks/useView";

const ServerProfileSettings = () => {
    const { server } = useServer();
    const { openMenu } = useView();

    const [serverName, setServerName] = useState("");

    useEffect(() => {
        const setName = async () => {
            if (!server) return;
            setServerName(server.name);
        };
        setName();
    }, [server]);

    const handleSave = async () => {
        if (!server) return;
        const res = await api.patch(`servers/${server.id}`, {
            name: serverName,
        });

        if (res.status !== 200) return;
    };

    if (!server) return null;

    return (
        <div className="flex flex-col h-dvh">
            <div className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <h1 className="flex text-lg font-bold items-center gap-4">
                    <img
                        src="/arrow-left.png"
                        className="md:hidden w-6 h-7"
                        onClick={openMenu}
                    />
                    Server Profile
                </h1>
            </div>
            <div className="grow p-10 flex flex-col gap-10 max-w-160">
                <div className="border border-(--border-color) rounded-lg">
                    <div className="max-w-160 h-26 bg-[#2e2e2e] rounded-t-lg"></div>
                    <div className="flex gap-5 items-center max-w-160 p-5">
                        <div>
                            {server.icon ? (
                                <img
                                    src={server.icon}
                                    className="w-16 h-16 rounded-2xl"
                                />
                            ) : (
                                <div className="bg-[#272727] w-16 h-16 rounded-2xl text-2xl flex justify-center items-center select-none">
                                    {serverName.slice(0, 3)}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="font-bold text-xl">
                                {serverName}
                            </div>
                            <div className="flex gap-4 text-sm">
                                <div className="flex gap-1 items-center">
                                    <div className="bg-green-600 w-2 h-2 rounded-full"></div>
                                    <div>x Online</div>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <div className="bg-gray-600 w-2 h-2 rounded-full"></div>
                                    <div>{server.members?.length} Members</div>
                                </div>
                            </div>

                            <div className="flex gap-1 text-sm">
                                <div>Est.</div>
                                {new Date(server.created_at).toLocaleDateString(
                                    undefined,
                                    {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    },
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <FormInput
                        id="name"
                        type="text"
                        label_text="Server Name"
                        className="bg-[#0A0A0A] border-2 border-[#1C1C1C] h-10 rounded-lg px-3 outline-none"
                        value={serverName}
                        onChange={(e) => setServerName(e.target.value)}
                    />
                </div>

                <button
                    disabled={server.name === serverName}
                    className="enabled:bg-[#1c1c1c] enabled:hover:bg-[#212121] h-10 enabled:hover:cursor-pointer disabled:bg-[#131313] disabled:text-[#646464] rounded-lg"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default ServerProfileSettings;
