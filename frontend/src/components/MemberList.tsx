import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";
import api from "../services/api";

interface ServerMemberType {
    user_id: string;
    joined_at: string;
}

const MemberList = () => {
    const { server } = useServer();
    const [members, setMembers] = useState<ServerMemberType[]>([]);

    useEffect(() => {
        const getMembers = async () => {
            if (!server) return;
            const res = await api.get(`servers/${server.id}/members`);
            if (res.status !== 200) return;

            setMembers(res.data);
        };

        getMembers();
    }, [server]);
    return (
        <>
            {members.map((member) => (
                <div key={member.user_id}>id: {member.user_id.slice(-8)}</div>
            ))}
        </>
    );
};

export default MemberList;
