import { Link } from "react-router";

const HomePage = () => {
    return (
        <div className="w-full flex flex-col items-center min-h-dvh text-white bg-linear-to-tr from-(--bg-secondary) to-[#0f0b1f]">
            <nav className="w-full flex justify-center border-b border-white/10 bg-(--bg-secondary)/70 backdrop-blur-md sticky top-0 z-50">
                <div className="w-[90%] 2xl:w-full 2xl:max-w-7xl h-18 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-extrabold text-xl tracking-tight">
                            Relayed
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
                        <a
                            href="#features"
                            className="hover:text-white transition-colors"
                        >
                            Features
                        </a>
                    </div>

                    <Link to="/app">
                        <button className="text-black/80 px-5 py-2.5 rounded-2xl bg-white hover:bg-white/90 font-semibold cursor-pointer">
                            Open App
                        </button>
                    </Link>
                </div>
            </nav>
            <main className="flex-1 w-[90%] 2xl:w-full 2xl:max-w-7xl py-5 lg:py-20 flex flex-col gap-15">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
                    <img
                        src="/homepage-hero.png"
                        alt="homepage hero image"
                        className="w-100 md:w-110 xl:w-130"
                    />
                    <div className="w-[90%] flex flex-col gap-3 lg:gap-4 xl:gap-5">
                        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-center lg:text-left">
                            <div>THE PLACE WHERE YOUR</div>
                            <div>COMMUNITY LIVES</div>
                        </h1>
                        <p className="text-white/70 text-sm sm:text-base md:text-lg lg:text-xl">
                            Build your own corner on Relayed to play, chat, and
                            hang out with friends or grow a global community.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-sm font-semibold">
                            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                                Zero ads
                            </div>

                            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                                No ID checks
                            </div>

                            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                                No tracking
                            </div>

                            <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5">
                                Forever free
                            </div>
                        </div>
                        <div className="flex gap-3 flex-col md:flex-row py-5 justify-center lg:justify-start">
                            <Link to={"/app"}>
                                <button className="w-full py-3 px-5 rounded-2xl bg-[#7758f2] hover:bg-[#6b50d9] cursor-pointer font-bold text-xl transition-colors">
                                    Open Relayed
                                </button>
                            </Link>
                            <a href="#features">
                                <button className="w-full py-3 px-5 rounded-2xl bg-white/5 hover:bg-white/4 cursor-pointer font-bold text-xl transition-colors">
                                    Explore Features
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                <div id="features">
                    <div className="text-center flex flex-col items-center gap-4">
                        <h2 className="text-2xl md:text-4xl font-extrabold">
                            Everything you need to connect
                        </h2>
                    </div>
                </div>
            </main>
            <footer className="w-full border-t border-white/10 mt-10">
                <div className="w-[90%] 2xl:w-full 2xl:max-w-7xl mx-auto py-8 flex flex-col md:flex-row gap-4 items-center justify-between text-sm text-white/50">
                    <div>
                        © {new Date().getFullYear()} Relayed. Open source chat
                        platform.
                    </div>

                    <div className="flex items-center gap-5">
                        <a
                            href="#features"
                            className="hover:text-white transition-colors"
                        >
                            Features
                        </a>

                        <Link
                            to="/app"
                            className="hover:text-white transition-colors"
                        >
                            Open App
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
