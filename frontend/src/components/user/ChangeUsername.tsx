import { useEffect, useState } from "react";
import FormInput from "../FormInput";
import useUser from "../../hooks/useUser";
import api from "../../services/api";

const ChangeUsername = () => {
    const { user } = useUser();

    const [username, setUsername] = useState("");

    useEffect(() => {
        if (!user) return;
        const sU = () => setUsername(user.username);
        sU();
    }, [user]);

    const handleSubmit = async () => {
        await api.patch("users/@me", { username });
    };

    return (
        <div className="flex flex-col gap-8 w-90">
            <div className="flex items-center">
                <h1 className="text-2xl text-center w-full">Change Username</h1>
            </div>

            <div className="grow flex flex-col gap-8">
                <FormInput
                    id="name"
                    type="text"
                    className="bg-[#0e0e0e] border outline-0 border-[#2b2b2b] h-12 rounded-lg px-3"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    value={username}
                />

                <button
                    className="p-2 rounded-xl bg-[#785D94] enabled:hover:bg-[#674f80] enabled:active:bg-[#5f4976] enabled:hover:cursor-pointer disabled:bg-[#37234c]"
                    onClick={handleSubmit}
                    disabled={!username}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default ChangeUsername;
