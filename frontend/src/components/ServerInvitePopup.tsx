import { useState } from "react";
import useServer from "../hooks/useServer";
import type { ServerInviteType } from "../types/server";
import api from "../services/api";

const ServerInvitePopup = () => {
    const { server } = useServer();

    const [invite, setInvite] = useState<ServerInviteType | null>(null);

    const [expireAfter, setExpireAfter] = useState<number | null>(3 * 24);
    const [maxUses, setMaxUses] = useState<number | null>(null);

    if (!server) return null;

    const handleExpireSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        if (v === "null") setExpireAfter(null);
        else setExpireAfter(Number(v));
    };

    const handleMaxUsesSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const v = e.target.value;
        if (v === "null") setMaxUses(null);
        else setMaxUses(Number(v));
    };

    const handleGenerate = async () => {
        const now = new Date();
        const expiresAt = new Date(
            now.getTime() + (expireAfter ?? 0) * 60 * 60 * 1000,
        );

        const res = await api.post<ServerInviteType>(
            `/servers/${server.id}/invites`,
            {
                max_uses: maxUses,
                expires_at: expiresAt,
            },
        );
        if (res.status !== 201) return;

        setInvite(res.data);
    };

    return (
        <div className="flex flex-col gap-12 grow w-100">
            <div className="flex flex-col gap-5">
                <h1 className="text-lg w-full">
                    Invite Friends to {server?.name}
                </h1>

                <p>Expire after</p>
                <select
                    className="bg-[#070707] h-10 rounded-md outline-none"
                    defaultValue={3 * 24}
                    onChange={handleExpireSelect}
                >
                    <option value={1}>1 hour</option>
                    <option value={6}>6 hours</option>
                    <option value={12}>12 hours</option>
                    <option value={24}>1 day</option>
                    <option value={3 * 24}>3 days</option>
                    <option value={7 * 24}>7 days</option>
                    <option value={14 * 24}>14 days</option>
                    <option value="null">Never</option>
                </select>

                <p>Max Number of Uses</p>
                <select
                    className="bg-[#070707] h-10 rounded-md outline-none"
                    defaultValue="null"
                    onChange={handleMaxUsesSelect}
                >
                    <option value="null">No limit</option>
                    <option value="1">1 use</option>
                    <option value="3">3 uses</option>
                    <option value="5">5 uses</option>
                    <option value="10">10 uses</option>
                    <option value="25">25 uses</option>
                    <option value="50">50 uses</option>
                    <option value="100">100 uses</option>
                </select>

                <button
                    className="bg-sky-800 hover:bg-sky-900 hover:cursor-pointer w-50 h-10 rounded-md"
                    onClick={handleGenerate}
                >
                    Generate new Invite
                </button>

                <p>
                    {invite && (
                        <a href={`http://localhost:3000/invite/${invite.code}`}>
                            http://localhost:3000/invite/{invite.code}
                        </a>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ServerInvitePopup;
