import { useState } from "react";
import FormInput from "../FormInput";
import api from "../../services/api";
import { useNavigate } from "react-router";

import useUser from "../../hooks/useUser";
import type { ServerInviteType } from "../../types/server";

type MenuProps = {
    onClose: () => void;
    switchMenu: () => void;
};

const JoinServerMenu = ({ onClose, switchMenu }: MenuProps) => {
    const [inviteCode, setInviteCode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { servers } = useUser();

    const handleServerJoin = async () => {
        let res = await api.get<ServerInviteType>(`/invites/${inviteCode}`);

        if (res.status !== 200) return;

        if (servers?.some((s) => res.data.server?.id === s.id)) {
            navigate(`/channels/${res.data.server?.id}`);
            onClose();
            return;
        }

        res = await api.post(`/invites/${inviteCode}`);

        if (res.status === 403) {
            setError(res.data.detail ?? "Something went wrong.");
        }

        if (res.status !== 200) return;

        onClose();
    };

    return (
        <div className="flex flex-col gap-12 grow w-100">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl text-center w-full">Join Server</h1>
                <p className="text-sm">
                    Enter invite code to join existing server
                </p>
            </div>

            <div className="grow flex flex-col gap-6">
                <FormInput
                    id="invite"
                    type="text"
                    label_text="Invite Code"
                    className="bg-[#0e0e0e] border outline-0 border-[#2b2b2b] h-12 rounded-lg px-3"
                    onChange={(e) => setInviteCode(e.target.value)}
                    error={error ?? ""}
                    required
                />

                <button
                    className="p-2 rounded-xl bg-[#785D94] enabled:hover:bg-[#674f80] enabled:active:bg-[#5f4976] enabled:hover:cursor-pointer disabled:bg-[#37234c]"
                    onClick={handleServerJoin}
                    disabled={!inviteCode}
                >
                    Join
                </button>
            </div>

            <h1 className="text-md text-center w-full flex justify-around">
                <div className="flex gap-1">
                    Want your own server?
                    <span
                        className="font-extrabold text-[#785D94] hover:cursor-pointer hover:underline"
                        onClick={switchMenu}
                    >
                        Create Server
                    </span>
                </div>
            </h1>
        </div>
    );
};

export default JoinServerMenu;
