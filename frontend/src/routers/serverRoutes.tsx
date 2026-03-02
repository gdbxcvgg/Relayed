import { Route } from "react-router";
import ServerLayout from "../layouts/ServerLayout";
import ServerPage from "../pages/ServerPage";
import ServerProvider from "../providers/ServerProvider";

export const serverRoutes = (
    <>
        <Route
            element={
                <ServerProvider>
                    <ServerLayout />
                </ServerProvider>
            }
        >
            <Route path="channels/:serverId">
                <Route index element={<ServerPage />} />
                <Route path=":roomId" element={<ServerPage />} />
            </Route>
        </Route>
    </>
);
