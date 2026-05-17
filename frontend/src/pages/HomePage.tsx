import { Link } from "react-router";

const HomePage = () => {
    return (
        <div className="w-full flex flex-col items-center min-h-dvh bg-(--bg-secondary) text-white">
            <nav>navigation</nav>
            <main className="w-[90%] 2xl:w-full 2xl:max-w-7xl py-20 flex flex-col gap-10">
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
                                <button className="w-full py-3 px-5 rounded-2xl bg-[#7758f2] hover:bg-[#6b50d9] cursor-pointer font-bold text-xl">
                                    Open Relayed
                                </button>
                            </Link>
                            <a href="#features">
                                <button className="w-full py-3 px-5 rounded-2xl bg-white/5 hover:bg-white/4 cursor-pointer font-bold text-xl">
                                    Explore Features
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <footer>&copy; {new Date().getFullYear()} Relayed</footer>
        </div>
    );
};

export default HomePage;
