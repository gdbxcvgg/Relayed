import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
};

export default ProtectedRoute;
