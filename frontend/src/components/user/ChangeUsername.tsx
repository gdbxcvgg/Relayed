import { useEffect, useState } from "react";
import FormInput from "../FormInput";
import useUser from "../../hooks/useUser";
import api from "../../services/api";

const ChangeUsername = ({ onClose }: { onClose?: () => void }) => {
    const { user } = useUser();

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;
        const sU = () => setUsername(user.username);
        sU();
    }, [user]);

    const handleSubmit = async () => {
        const res = await api.patch("users/@me", { username });

        if (res.status === 400) {
            setError(res.data.username ?? "");
        }

        if (res.status !== 200) return;

        if (onClose) onClose();
    };

    return (
        <div className="flex flex-col gap-8 grow w-100">
            <div className="flex items-center">
                <h1 className="text-2xl text-center w-full">Username</h1>
            </div>

            <div className="grow flex flex-col gap-8">
                <div>
                    <FormInput
                        id="username"
                        type="text"
                        className="bg-[#0e0e0e] border outline-0 border-[#2b2b2b] h-12 rounded-lg px-3"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                    />

                    <div className="text-red-800 text-xs pt-3">{error}</div>
                </div>

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
