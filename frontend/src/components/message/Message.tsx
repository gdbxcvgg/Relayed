import { useState } from "react";
import type { MessageType } from "../../types/message";
import UserAvatar from "../user/UserAvatar";
import MessageMenu from "./MessageToolbar";
import api from "../../services/api";
import useRoom from "../../hooks/useRoom";

interface MessagePropsType {
    message: MessageType;
    small?: boolean;
}

const Message = ({ message, small }: MessagePropsType) => {
    const { room } = useRoom();

    const [edit, setEdit] = useState(false);
    const [newMessage, setNewMessage] = useState<string | null>(
        message.content,
    );

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

    if (!room) return null;

    const handleEdit = async (
        e:
            | React.FormEvent<HTMLFormElement>
            | React.MouseEvent<HTMLSpanElement, MouseEvent>,
    ) => {
        e.preventDefault();

        if (newMessage === message.content) {
            setEdit(false);
            return;
        }

        const res = await api.patch(
            `/rooms/${room.id}/messages/${message.id}`,
            { content: newMessage },
        );

        if (res.status !== 200) return;
        setEdit(false);
    };

    if (small)
        return (
            <div className="group/message relative">
                <MessageMenu message={message} onEdit={() => setEdit(true)} />
                <div className="flex group/inner group-hover/message:bg-[#121212] items-center p-0.5">
                    <div className="w-12 min-w-12 invisible group-hover/inner:visible text-[#676767] text-xs">
                        {formatDate(message.created_at, true)}
                    </div>
                    <div className="w-full">
                        {edit ? (
                            <form onSubmit={handleEdit}>
                                <input
                                    className="w-full h-11 bg-[#141414] outline-0 p-3 rounded-lg border border-(--border-color)"
                                    type="text"
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    value={newMessage ?? ""}
                                />
                                <p className="text-xs pt-2">
                                    <span
                                        onClick={() => setEdit(false)}
                                        className="text-blue-500 hover:underline hover:cursor-pointer"
                                    >
                                        Cancel
                                    </span>{" "}
                                    | Press Enter to{" "}
                                    <span
                                        onClick={handleEdit}
                                        className="text-blue-500 hover:underline hover:cursor-pointer"
                                    >
                                        Save
                                    </span>
                                </p>
                            </form>
                        ) : (
                            <>
                                {message.content}
                                {message.edited_at && (
                                    <span className="text-xs font-bold text-[#6b6b6b]">
                                        {" "}
                                        (edited)
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    return (
        <div className="group/message relative">
            <MessageMenu message={message} onEdit={() => setEdit(true)} />
            <div className="flex mt-8 group-hover/message:bg-[#121212] p-0.5">
                <div className="w-12 min-w-12">
                    <UserAvatar user={message.author} />
                </div>
                <div className="w-full">
                    <div className="flex gap-3 items-center">
                        <div>
                            {message.author.display_name ??
                                message.author.username}
                        </div>
                        <div className="text-[#676767] text-sm">
                            {formatDate(message.created_at)}
                        </div>
                    </div>
                    <div className="w-full">
                        {edit ? (
                            <form onSubmit={handleEdit}>
                                <input
                                    className="w-full h-[50px] bg-[#141414] outline-0 p-3 rounded-lg"
                                    type="text"
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    value={newMessage ?? ""}
                                />
                                <p className="text-xs pt-2">
                                    <span
                                        onClick={() => setEdit(false)}
                                        className="text-blue-500 hover:underline hover:cursor-pointer"
                                    >
                                        Cancel
                                    </span>{" "}
                                    | Press Enter to{" "}
                                    <span
                                        onClick={handleEdit}
                                        className="text-blue-500 hover:underline hover:cursor-pointer"
                                    >
                                        Save
                                    </span>
                                </p>
                            </form>
                        ) : (
                            <>
                                {message.content}
                                {message.edited_at && (
                                    <span className="text-xs font-bold text-[#6b6b6b]">
                                        {" "}
                                        (edited)
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message;
