import useServer from "../../hooks/useServer";
import useView from "../../hooks/useView";

const ServerMembersSettings = () => {
    const { server } = useServer();

    const { openMenu } = useView();

    if (!server) return;

    const relativeTime = (date: string) => {
        const rtf = new Intl.RelativeTimeFormat(undefined, { style: "short" });
        const diff =
            (new Date(date).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24);

        return rtf.format(Math.floor(diff), "day");
    };

    return (
        <div className="flex flex-col h-dvh items-center">
            <div className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <h1 className="flex text-lg font-bold items-center gap-4">
                    <img
                        src="/arrow-left.png"
                        className="md:hidden w-6 h-7"
                        onClick={openMenu}
                    />
                    Server Members
                </h1>
            </div>
            <div className="grow p-10 flex flex-col gap-10 w-full md:w-3/4">
                <div className="bg-(--bg-secondary) border border-(--border-color) rounded-lg">
                    <h1 className="border-b border-b-(--border-color) p-3 text-lg font-extrabold">
                        Recent Members [{server.members?.length} Total]
                    </h1>

                    <div className="flex text-lg font-extrabold p-3">
                        <div className="w-5/12">Name</div>
                        <div className="w-5/12">Member Since</div>
                        <div className="w-2/12">Actions</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        {server.members
                            ?.slice(0)
                            .reverse()
                            .map((member) => (
                                <div
                                    key={member.user.id}
                                    className="flex border-b border-b-(--border-color) h-16 text-sm items-center p-3"
                                >
                                    <div className="w-5/12 flex items-center gap-2">
                                        <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                                            {member.user.username.slice(0, 1)}
                                        </div>
                                        <div className="flex flex-col">
                                            <div>
                                                {member.user.display_name ??
                                                    member.user.username}
                                            </div>
                                            <div className="text-xs">
                                                {member.user.username}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-5/12">
                                        {relativeTime(member.joined_at)}
                                    </div>
                                    <div className="w-2/12 flex gap-3">
                                        <button
                                            className="text-orange-700 enabled:hover:cursor-pointer disabled:text-[#434343]"
                                            disabled={
                                                server.owner.id ===
                                                member.user.id
                                            }
                                        >
                                            Kick
                                        </button>
                                        <button
                                            className="text-red-700 enabled:hover:cursor-pointer disabled:text-[#434343]"
                                            disabled={
                                                server.owner.id ===
                                                member.user.id
                                            }
                                        >
                                            Ban
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerMembersSettings;
