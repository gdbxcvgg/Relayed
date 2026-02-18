import { useState } from "react";
import { Link } from "react-router";

import FormInput from "../components/FormInput";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // [ login logic ]
    };

    return (
        <div className="flex flex-row justify-center items-center min-h-dvh sm:bg-[url(./background.png)] bg-fixed bg-cover bg-center">
            <main className="flex flex-col bg-[#0C0C0C] text-white w-dvh h-dvh sm:w-xl sm:h-150 py-20 px-8 sm:p-15 gap-4 sm:rounded-2xl">
                <header className="text-center pb-10">
                    <h1 className="text-3xl font-extrabold">Welcome Back</h1>
                    <p>Sign in to continue to our chat app</p>
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
                            id="password"
                            type="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            label_text="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#785D94] rounded-lg p-2 h-12 font-extrabold hover:bg-[#55406b] hover:cursor-pointer"
                    >
                        Log in
                    </button>
                </form>
                <p className="flex flex-row gap-3">
                    Need an account?
                    <Link to="/register" className="text-[#785D94] font-bold">
                        Create one
                    </Link>
                </p>
            </main>
        </div>
    );
};

export default LoginPage;
