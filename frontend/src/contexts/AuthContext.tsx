import { createContext } from "react";

interface AuthProps {
    login(email: string, password: string): Promise<boolean>;
    logout?(): void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthProps>({
    isAuthenticated: false,
    login: async () => false,
});

export default AuthContext;
