import { Route } from "react-router";
import ServerLayout from "../layouts/ServerLayout";
import AppPage from "../pages/AppPage";

export const serverRoutes = (
    <>
        <Route element={<ServerLayout />}>
            <Route path="channels/:serverId">
                <Route index element={<AppPage />} />
                <Route path=":roomId">
                    <Route index element={<AppPage />} />
                </Route>
            </Route>
        </Route>
    </>
);
