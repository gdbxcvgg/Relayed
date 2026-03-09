import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import FormInput from "../components/FormInput";
import { register } from "../services/auth";
import AuthContext from "../contexts/AuthContext";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registered = await register({
            email,
            username,
            password,
            display_name: displayName,
            date_of_birth: dateOfBirth.toString(),
        });

        if (registered) {
            navigate("/login");
        }
    };

    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <Navigate to="/app" replace />;

    return (
        <div className="flex flex-row justify-center items-center min-h-dvh sm:bg-[url(/background.png)] bg-fixed bg-cover bg-center">
            <main className="flex flex-col bg-[#0C0C0C] text-white w-dvh h-dvh sm:w-xl sm:h-225 py-20 px-8 sm:p-15 gap-4 sm:rounded-2xl">
                <header className="text-center pb-10">
                    <h1 className="text-3xl font-extrabold">
                        Create an account
                    </h1>
                </header>

                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                    <div className="flex flex-col gap-7">
                        <FormInput
                            id="email"
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            label_text="Email"
                        />

                        <FormInput
                            id="username"
                            type="text"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            label_text="Username"
                        />

                        <FormInput
                            id="display_name"
                            type="text"
                            onChange={(e) => setDisplayName(e.target.value)}
                            label_text="Display Name"
                        />

                        <FormInput
                            id="password"
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            label_text="Password"
                        />

                        <FormInput
                            id="date_of_birth"
                            type="date"
                            required
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            label_text="Date of Birth"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#785D94] rounded-lg p-2 h-12 font-extrabold hover:bg-[#55406b] hover:cursor-pointer"
                    >
                        Register
                    </button>
                </form>
                <p className="flex flex-row gap-3">
                    Already have an account?
                    <Link to="/login" className="text-[#785D94] font-bold">
                        Log in
                    </Link>
                </p>
            </main>
        </div>
    );
};

export default RegisterPage;
