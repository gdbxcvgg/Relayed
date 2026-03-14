import type { MessageType } from "../../types/message";
import MessageMenu from "./MessageToolbar";

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
            <div className="group/message relative">
                <MessageMenu message={message} />
                <div className="flex group/inner group-hover/message:bg-[#121212] items-center p-0.5">
                    <div className="w-12 min-w-12 invisible group-hover/inner:visible text-[#676767] text-xs">
                        {formatDate(message.created_at, true)}
                    </div>
                    <div>{message.content}</div>
                </div>
            </div>
        );
    return (
        <div className="group/message relative">
            <MessageMenu message={message} />
            <div className="flex mt-8 group-hover/message:bg-[#121212] p-0.5">
                <div className="w-12 min-w-12">
                    <div className="bg-[#272727] w-9 h-9 rounded-4xl flex justify-center items-center">
                        {message.author.username.slice(0, 1)}
                    </div>
                </div>
                <div>
                    <div className="flex gap-3 items-center">
                        <div>
                            {message.author.display_name ??
                                message.author.username}
                        </div>
                        <div className="text-[#676767] text-sm">
                            {formatDate(message.created_at)}
                        </div>
                    </div>
                    <div>{message.content}</div>
                </div>
            </div>
        </div>
    );
};

export default Message;
