import { Link } from "react-router";
import useUser from "../hooks/useUser";

const ServersList = () => {
    const { servers } = useUser();

    return (
        <>
            {servers?.map((server) => (
                <Link to={`/channels/${server.id}`} key={server.id}>
                    <div>{server.name}</div>
                </Link>
            ))}
        </>
    );
};

export default ServersList;
