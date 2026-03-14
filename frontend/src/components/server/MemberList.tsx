import useServer from "../../hooks/useServer";

const MemberList = () => {
    const { server } = useServer();

    return (
        <div className="flex flex-col gap-1">
            {server?.members?.map((member) => (
                <div
                    key={member.user.id}
                    className="flex gap-2 items-center py-1 rounded-lg hover:bg-[#121212] active:bg-[#161616]"
                >
                    <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                        {member.user.username.slice(0, 1)}
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        {member.user.display_name ?? member.user.username}
                        {server?.owner.id === member.user.id && (
                            <div className="w-5 h-5">
                                <img src="/crown.png" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MemberList;
