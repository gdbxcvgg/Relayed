import { Route } from "react-router";
import ServerLayout from "../layouts/ServerLayout";
import ServerPage from "../pages/ServerPage";

export const serverRoutes = (
    <>
        <Route element={<ServerLayout />}>
            <Route path="channels/:serverId">
                <Route index element={<ServerPage />} />
                <Route path=":roomId" element={<ServerPage />} />
            </Route>
        </Route>
    </>
);
