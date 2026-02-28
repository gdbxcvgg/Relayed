import useUser from "../hooks/useUser";
import NavIcon from "./NavIcon";

const ServersList = () => {
    const { servers } = useUser();

    return (
        <>
            {servers?.map((server) => (
                <NavIcon server={server} key={server.id} />
            ))}
        </>
    );
};

export default ServersList;
