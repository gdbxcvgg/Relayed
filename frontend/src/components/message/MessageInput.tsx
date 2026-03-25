import { useState } from "react";
import useRoom from "../../hooks/useRoom";
import useMessages from "../../hooks/useMessages";

const MessageInput = ({ scroll }: { scroll: () => void }) => {
    const [message, setMessage] = useState<string>("");
    const { room } = useRoom();
    const { sendMessage } = useMessages();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (!room) return;
        e.preventDefault();
        const success = await sendMessage({ content: message });
        if (success) {
            setMessage("");
            requestAnimationFrame(() => scroll());
        }
    };
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full h-[50px] bg-[#141414] outline-0 p-3 rounded-lg"
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    placeholder={`Message in #${room?.name}`}
                />
            </form>
        </div>
    );
};

export default MessageInput;
