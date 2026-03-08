import { useEffect, useRef, useState } from "react";
import AddServerMenu from "./AddServerMenu";

const AddServerButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleAddServer = () => {
        setShowMenu(true);
    };

    useEffect(() => {
        const handleClick = (e: PointerEvent) => {
            if (
                !menuRef.current?.contains(e.target as Node) &&
                !buttonRef.current?.contains(e.target as Node)
            )
                setShowMenu(false);
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div
                ref={buttonRef}
                onClick={handleAddServer}
                className="bg-[#785D94] hover:bg-[#4d3c5f] w-[50px] h-[50px] flex flex-col justify-around items-center rounded-lg min-h-[50px]"
            >
                <img src="/plus.png" className="w-8 h-8" />
            </div>

            {showMenu && (
                <AddServerMenu
                    ref={menuRef}
                    hideMenu={() => setShowMenu(false)}
                />
            )}
        </>
    );
};

export default AddServerButton;
