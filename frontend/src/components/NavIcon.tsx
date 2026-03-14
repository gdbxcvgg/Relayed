import { Link } from "react-router";
import type { ServerType } from "../types/server";

interface NavIconProps {
    server: ServerType;
}

const NavIcon = ({ server }: NavIconProps) => {
    return (
        <Link
            to={`/channels/${server.id}`}
            className="bg-[#272727] hover:bg-[#111111] w-[50px] h-[50px] flex flex-col justify-around rounded-lg min-h-[50px]"
        >
            <div className="text-center">{server.name.slice(0, 3)}</div>
        </Link>
    );
};

export default NavIcon;
