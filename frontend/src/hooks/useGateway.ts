import useWebSocket from "react-use-websocket"
import type { GatewayEventType } from "../types/gateway"

const useGateway = () => {
    const gateway = useWebSocket<GatewayEventType>(
        import.meta.env.VITE_GATEWAY_URL, 
        { 
            share: true,
        }
    )

    return gateway
}

export default useGateway