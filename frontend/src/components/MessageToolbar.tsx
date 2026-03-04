import api from "../services/api";
import type { MessageType } from "./Message";

interface MenuItemProps {
    img: string;
    onClick(): void;
}

const MenuItem = ({ img, onClick }: MenuItemProps) => {
    return (
        <div
            className="w-6 h-6 p-0.5 hover:p-0.25 hover:bg-[#202020] hover:cursor-pointer active:bg-[#323232] rounded-md"
            onClick={onClick}
        >
            <img src={img} />
        </div>
    );
};

const MessageToolbar = ({ message }: { message: MessageType }) => {
    const copyMessageId = async () => {
        await navigator.clipboard.writeText(message.id);
    };

    const handleDelete = async () => {
        try {
            const res = await api.delete(
                `rooms/${message.room_id}/messages/${message.id}`,
            );
            if (res.status !== 204) return;

            console.log(`[MESSAGE]: Deleted message ${message.id}`);
        } catch {
            console.log(`[MESSAGE]: Can't delete message ${message.id}`);
        }
    };

    const openContextMenu = () => {};

    return (
        <div className="absolute bg-(--bg-main) border-(--border-color) border rounded-lg p-1 right-4 -top-4 items-center min-w-8 justify-center gap-1 hidden group-hover/message:flex">
            <MenuItem img="/id.png" onClick={copyMessageId} />
            <MenuItem img="/trash.png" onClick={handleDelete} />
            <MenuItem img="/more.png" onClick={openContextMenu} />
        </div>
    );
};

export default MessageToolbar;
