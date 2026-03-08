const AddServerMenu = ({
    ref,
    hideMenu,
}: {
    ref: React.RefObject<HTMLDivElement | null>;
    hideMenu: () => void;
}) => {
    return (
        <div className="absolute flex w-full left-0 top-0 z-100 h-full justify-center items-center bg-[#00000095]">
            <div
                className="flex flex-col justify-between bg-[#141414] rounded-lg h-100 max-h-full w-120 p-10"
                ref={ref}
            >
                <div className="flex items-center">
                    <h1 className="text-2xl text-center w-full">
                        Create Your Server
                    </h1>

                    <img
                        src="/close.png"
                        className="w-6 h-6 hover:cursor-pointer"
                        onClick={hideMenu}
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="text-xl text-center w-full">
                        Already have an invite?
                    </h1>
                    <button className="bg-[#1a1a1a] border border-(--border-color) hover:bg-[#171717] active:bg-[#121212] hover:cursor-pointer w-full p-2 rounded-lg">
                        Join Server
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddServerMenu;
