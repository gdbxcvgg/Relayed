import { Route, Routes, BrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AppPage from "../pages/AppPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DefaultLayout from "../layouts/DefaultLayout";
import FriendsLayout from "../layouts/FriendsLayout";

import { serverRoutes } from "./serverRoutes";

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

                    {serverRoutes}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
