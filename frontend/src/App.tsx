import AuthProvider from "./providers/AuthProvider";
import MainRouter from "./routers/MainRouter";

function App() {
    return (
        <div
            onContextMenu={(e) => e.preventDefault()}
            className="flex max-w-dvw"
        >
            <AuthProvider>
                <MainRouter />
            </AuthProvider>
        </div>
    );
}

export default App;
