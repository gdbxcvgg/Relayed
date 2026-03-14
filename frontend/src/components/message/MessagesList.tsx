import useMessages from "../../hooks/useMessages";
import Message from "./Message";

const MessagesList = () => {
    const { messages } = useMessages();

    return (
        <>
            <div>
                {messages
                    .slice(0)
                    .reverse()
                    .map((message, index) => {
                        let small = false;
                        if (index > 0) {
                            const prevMsg = messages.slice(0).reverse()[
                                index - 1
                            ];

                            if (prevMsg.author.id === message.author.id)
                                small = true;

                            const prevDate = new Date(prevMsg.created_at);
                            const currDate = new Date(message.created_at);

                            if (
                                Number(currDate) - Number(prevDate) >
                                30 * 60 * 1000
                            )
                                small = false;
                        }
                        return (
                            <Message
                                message={message}
                                key={message.id}
                                small={small}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default MessagesList;
