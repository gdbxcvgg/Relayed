type StatusType = "online" | "dnd" | "offline";

const PresenceStatus = ({ status }: { status: StatusType }) => {
    let bgColor = "";
    if (status === "online") bgColor = " bg-green-600";
    if (status === "dnd") bgColor = " bg-red-700";
    if (status === "offline") bgColor = " bg-gray-500";

    return (
        <div
            className={`flex items-center justify-center rounded-full w-2.5 min-w-2.5 h-2.5 min-h-2.5 ${bgColor}`}
        >
            {status === "offline" && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#000000]"></div>
            )}

            {status === "dnd" && (
                <div className="w-1.75 h-0.75 bg-[#000000]"></div>
            )}
        </div>
    );
};

export default PresenceStatus;
