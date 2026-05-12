import RoomProvider from "../providers/RoomProvider";
import DMRoomView from "../components/room/DMRoomView";
import ServerProvider from "../providers/ServerProvider";

const DMChatPage = () => {
    return (
        <ServerProvider>
            <RoomProvider>
                <DMRoomView />
            </RoomProvider>
        </ServerProvider>
    );
};

export default DMChatPage;
