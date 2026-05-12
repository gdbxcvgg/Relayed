import { Route, Routes, BrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppPage from "../pages/AppPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DefaultLayout from "../layouts/DefaultLayout";
import FriendsLayout from "../layouts/FriendsLayout";

import { serverRoutes } from "./serverRoutes";
import UserProvider from "../providers/UserProvider";
import InvitePage from "../pages/InvitePage";
import SettingsPage from "../pages/SettingsPage";
import ViewProvider from "../providers/ViewProvider";
import DMChatPage from "../pages/DMChatPage";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route
                    element={
                        <ViewProvider>
                            <UserProvider>
                                <ProtectedRoute>
                                    <DefaultLayout />
                                </ProtectedRoute>
                            </UserProvider>
                        </ViewProvider>
                    }
                >
                    <Route path="app" element={<AppPage />} />

                    <Route element={<FriendsLayout />}>
                        <Route path="channels/@me">
                            <Route index element={<AppPage />} />
                            <Route path=":roomId" element={<DMChatPage />} />
                        </Route>
                    </Route>

                    {serverRoutes}

                    <Route path="invite/:inviteCode" element={<InvitePage />} />

                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
