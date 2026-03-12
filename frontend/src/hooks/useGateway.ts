import useWebSocket from "react-use-websocket"
import type { GatewayEvent } from "../types/gateway"


const onOpen = () => {
    console.log("[GATEWAY]: Connection open")
}

const onMessage = (e: MessageEvent) => {
    const event:GatewayEvent = JSON.parse(e.data)
    console.log(`[GATEWAY]: Event ${event.type}`)
}

const useGateway = () => {
    const gateway = useWebSocket<GatewayEvent>(
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