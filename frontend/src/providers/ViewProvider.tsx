import { useState } from "react";
import ViewContext from "../contexts/ViewContext";

const ViewProvider = ({ children }: { children?: React.ReactNode }) => {
    const [view, setView] = useState<"menu" | "chat">("menu");
    const openMenu = () => setView("menu");
    const openChat = () => setView("chat");

    return (
        <ViewContext value={{ view, openMenu, openChat }}>
            {children}
        </ViewContext>
    );
};

export default ViewProvider;
