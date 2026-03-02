import useWebSocket from "react-use-websocket"

type GatewayEvent = {
    opcode: number;
    type: string;
}

const onOpen = () => {
    console.log("[GATEWAY]: Connection open")
}

const onMessage = (e: MessageEvent) => {
    const event:GatewayEvent = JSON.parse(e.data)
    console.log(`[GATEWAY]: Event ${event.type}`)
}

const useGateway = () => {
    const gateway = useWebSocket(
        import.meta.env.VITE_GATEWAY_URL, 
        { 
            share: true,
            onOpen: () => onOpen(),
            onMessage: (e) => onMessage(e)
        }
    )

    return gateway
}

export default useGateway