import { createContext } from "react";

type ViewProps = {
    view: "menu" | "chat";
    openMenu: () => void;
    openChat: () => void;
};

const ViewContext = createContext<ViewProps | null>(null);

export default ViewContext;
