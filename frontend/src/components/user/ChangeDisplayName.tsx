import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import api from "../../services/api";
import FormInput from "../FormInput";

const ChangeDisplayName = () => {
    const { user } = useUser();

    const [displayName, setDisplayName] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;
        const sDN = () => setDisplayName(user.display_name);
        sDN();
    }, [user]);

    const handleSubmit = async () => {
        const dN = displayName !== "" ? displayName : null;
        await api.patch("users/@me", { display_name: dN });
    };

    return (
        <div className="flex flex-col gap-8 w-90">
            <div className="flex items-center">
                <h1 className="text-2xl text-center w-full">
                    Change Display Name
                </h1>
            </div>

            <div className="grow flex flex-col gap-8">
                <FormInput
                    id="name"
                    type="text"
                    className="bg-[#0e0e0e] border outline-0 border-[#2b2b2b] h-12 rounded-lg px-3"
                    onChange={(e) => {
                        setDisplayName(e.target.value);
                    }}
                    value={displayName ?? ""}
                />

                <button
                    className="p-2 rounded-xl bg-[#785D94] enabled:hover:bg-[#674f80] enabled:active:bg-[#5f4976] enabled:hover:cursor-pointer disabled:bg-[#37234c]"
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default ChangeDisplayName;
