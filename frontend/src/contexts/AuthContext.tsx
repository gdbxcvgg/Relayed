import { createContext } from "react";

type ErrorType = {
    email?: string;
    username?: string;
    password?: string;
    display_name?: string;
    date_of_birth?: string;
};

interface AuthProps {
    login(email: string, password: string): Promise<[boolean, ErrorType?]>;
    logout?(): void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthProps>({
    isAuthenticated: false,
    login: async () => [false],
});

export default AuthContext;
