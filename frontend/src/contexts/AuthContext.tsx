import { createContext, useEffect, useState } from "react";
import { isTokenExpired, login, refresh } from "../services/auth";

interface ProviderProps {
    login(email: string, password: string): Promise<boolean>;
    logout?(): void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<ProviderProps>({
    login: login,
    isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const access = localStorage.getItem("access");
            if (!access || isTokenExpired(access)) {
                await refresh().then((res) => {
                    if (res === false) {
                        localStorage.removeItem("access");
                        localStorage.removeItem("refresh");
                        setIsAuthenticated(false);
                    } else {
                        setIsAuthenticated(true);
                    }
                });
            } else {
                setIsAuthenticated(true);
            }
        };

        checkToken().then(() => {
            setLoading(false);
        });
    }, [loading]);

    const _login = async (
        email: string,
        password: string,
    ): Promise<boolean> => {
        const res = await login(email, password);
        setIsAuthenticated(res);
        return res;
    };

    return !loading ? (
        <AuthContext
            value={{ login: _login, isAuthenticated: isAuthenticated }}
        >
            {children}
        </AuthContext>
    ) : null;
};
