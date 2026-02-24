import { Route, Routes, BrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppPage from "../pages/AppPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DefaultLayout from "../layouts/DefaultLayout";
import ServerLayout from "../layouts/ServerLayout";
import FriendsLayout from "../layouts/FriendsLayout";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                    element={
                        <ProtectedRoute>
                            <DefaultLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="app" element={<AppPage />} />

                    <Route element={<FriendsLayout />}>
                        <Route path="channels/@me" element={<AppPage />} />
                    </Route>

                    <Route element={<ServerLayout />}>
                        <Route path="channels/:serverId">
                            <Route index element={<AppPage />} />
                            <Route path=":roomId">
                                <Route index element={<AppPage />} />
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
