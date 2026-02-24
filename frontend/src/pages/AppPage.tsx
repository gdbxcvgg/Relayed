import { Navigate } from "react-router";

const AppPage = () => {
    return <Navigate to="/channels/@me" replace />;
};

export default AppPage;
