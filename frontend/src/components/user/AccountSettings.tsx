import { useState } from "react";
import useUser from "../../hooks/useUser";
import PopUpModal from "../PopUpModal";
import ChangeUsername from "./ChangeUsername";
import ChangeDisplayName from "./ChangeDisplayName";

const Button = ({
    children,
    onClick,
}: {
    children?: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <button
            onClick={onClick}
            className="bg-(--bg-secondary) px-5 p-2 rounded-md border border-(--border-color) hover:cursor-pointer hover:bg-[#0c0c0c]"
        >
            {children}
        </button>
    );
};

type CardProps = {
    children: React.ReactNode;
    modal: React.ReactNode;
};

const InfoCard = ({ children, modal }: CardProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-20 justify-between">
                <div>{children}</div>
                <Button onClick={() => setOpen(true)}>Edit</Button>
            </div>

            <PopUpModal open={open} onClose={() => setOpen(false)}>
                {modal}
            </PopUpModal>
        </>
    );
};

const AccountSettings = () => {
    const { user } = useUser();
    const [showEmail, setShowEmail] = useState(false);

    if (!user) return null;

    return (
        <div className="flex flex-col h-dvh">
            <div className="h-[50px] min-h-[50px] w-full flex items-center px-3 border-b border-b-(--border-color)">
                <h1 className="text-lg font-bold">My Account</h1>
            </div>
            <div className="grow p-10 flex flex-col gap-10 max-w-160">
                <div className="border border-(--border-color) rounded-lg">
                    <div className="max-w-160 h-26 bg-[#2e2e2e] rounded-t-lg"></div>
                    <div className="flex gap-5 items-center max-w-160 p-5">
                        <div>
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    className="w-16 h-16 rounded-full"
                                />
                            ) : (
                                <div className="bg-[#272727] w-16 h-16 rounded-full text-2xl flex justify-center items-center select-none">
                                    {user?.username.slice(0, 1)}
                                </div>
                            )}
                        </div>
                        <div className="font-bold text-xl">
                            <div>{user?.display_name ?? user?.username}</div>
                        </div>
                    </div>
                </div>
                <InfoCard modal={<ChangeDisplayName />}>
                    <h2>Display Name</h2>
                    <p className="text-sm">
                        {user?.display_name ??
                            "You haven't added a display name yet."}
                    </p>
                </InfoCard>

                <InfoCard modal={<ChangeUsername />}>
                    <h2>Username</h2>
                    <p className="text-sm">@ {user?.username}</p>
                </InfoCard>

                <InfoCard modal={<div>-------------------</div>}>
                    <h2>Email</h2>
                    <div className="text-sm flex gap-3">
                        <div>
                            {showEmail
                                ? user?.email
                                : "*".repeat(
                                      user?.email?.split("@")[0].length ?? 0,
                                  ) +
                                  "@" +
                                  user?.email?.split("@")[1]}
                        </div>
                        <div
                            className="hover:cursor-pointer underline"
                            onClick={() => setShowEmail((e) => !e)}
                        >
                            {showEmail ? "Hide" : "Reveal"}
                        </div>
                    </div>
                </InfoCard>
            </div>
        </div>
    );
};

export default AccountSettings;
