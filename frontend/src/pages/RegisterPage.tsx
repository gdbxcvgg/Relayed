import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";

import FormInput from "../components/FormInput";
import { register } from "../services/auth";
import AuthContext from "../contexts/AuthContext";

type ErrorType = {
    email?: string;
    username?: string;
    password?: string;
    display_name?: string;
    date_of_birth?: string;
};

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState<string | null>(null);
    const [dateOfBirth, setDateOfBirth] = useState<string>("");

    const [error, setError] = useState<ErrorType | null | undefined>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dN = displayName !== "" ? displayName : undefined;

        const [registered, error] = await register({
            email,
            username,
            password,
            display_name: dN,
            date_of_birth: dateOfBirth.toString(),
        });

        if (registered) {
            navigate("/login");
        } else {
            setError(error);
        }
    };

    const { isAuthenticated } = useContext(AuthContext);
    if (isAuthenticated) return <Navigate to="/app" replace />;

    return (
        <div className="flex flex-row justify-center items-center min-h-dvh sm:bg-[url(/background.png)] bg-fixed bg-cover bg-center">
            <main className="flex flex-col bg-[#0C0C0C] min-h-dvh sm:min-h-0 text-white w-dvw sm:w-xl py-20 px-8 sm:p-15 gap-4 sm:rounded-2xl">
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
                            error={error?.email}
                        />

                        <FormInput
                            id="username"
                            type="text"
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            label_text="Username"
                            error={error?.username}
                        />

                        <FormInput
                            id="display_name"
                            type="text"
                            onChange={(e) => setDisplayName(e.target.value)}
                            label_text="Display Name"
                            error={error?.display_name}
                        />

                        <FormInput
                            id="password"
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            label_text="Password"
                            error={error?.password}
                        />

                        <FormInput
                            id="date_of_birth"
                            type="date"
                            required
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            label_text="Date of Birth"
                            error={error?.date_of_birth}
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
