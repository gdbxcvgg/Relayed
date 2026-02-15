import { useState } from "react";
import { Link } from "react-router";

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
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="flex flex-row gap-1"
                            >
                                Email
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                type="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#0A0A0A] border-2 border-[#1C1C1C] h-12 rounded-lg px-3"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="password"
                                className="flex flex-row gap-1"
                            >
                                Password
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                required
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-[#0A0A0A] border-2 border-[#1C1C1C] h-12 rounded-lg px-3"
                            />
                        </div>
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
