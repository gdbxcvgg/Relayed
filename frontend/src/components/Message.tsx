interface MessageAuthorType {
    id: string;
    username: string;
    display_name: string | null;
    avatar: string | null;
}

interface MessageType {
    id: string;
    content: string;
    author: MessageAuthorType;
    room_id: string;
    created_at: string;
    edited_at: string;
}

interface MessagePropsType {
    message: MessageType;
    small?: boolean;
}

const Message = ({ message, small }: MessagePropsType) => {
    const formatDate = (date: string, short?: boolean) => {
        return short
            ? new Date(date).toLocaleString(undefined, {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
              })
            : new Date(date).toLocaleString(undefined, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
              });
    };

    if (small)
        return (
            <div className="flex group hover:bg-[#121212] items-center">
                <div className="w-12 min-w-12 invisible group-hover:visible text-[#676767] text-xs">
                    {formatDate(message.created_at, true)}
                </div>
                <div>{message.content}</div>
            </div>
        );
    return (
        <div className="flex mt-8 hover:bg-[#121212]">
            <div className="w-12 min-w-12">
                <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                    {message.author.username.slice(0, 1)}
                </div>
            </div>
            <div>
                <div className="flex gap-3 items-center">
                    <div>
                        {message.author.display_name ?? message.author.username}
                    </div>
                    <div className="text-[#676767] text-sm">
                        {formatDate(message.created_at)}
                    </div>
                </div>
                <div>{message.content}</div>
            </div>
        </div>
    );
};

export default Message;
