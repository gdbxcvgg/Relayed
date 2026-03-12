import useWebSocket from "react-use-websocket"
import type { GatewayEventType } from "../types/gateway"


const onOpen = () => {
    console.log("[GATEWAY]: Connection open")
}

const onMessage = (e: MessageEvent) => {
    const event:GatewayEventType = JSON.parse(e.data)
    console.log(`[GATEWAY]: Event ${event.type}`)
}

const useGateway = () => {
    const gateway = useWebSocket<GatewayEventType>(
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