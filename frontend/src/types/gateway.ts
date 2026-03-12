import type { DeletedMessage, Message } from "./message"
import type { DeletedRoom, Room } from "./room";
import type { Server, ServerMember } from "./server";


type GatewayEventGeneric<T, K> = {
    opcode: number;
    type: T;
    data: K;
}

type ROOM_MESSAGE_SEND = GatewayEventGeneric<"MESSAGE_SEND", Message>
type ROOM_MESSAGE_UPDATED = GatewayEventGeneric<"MESSAGE_UPDATED", Message>
type ROOM_MESSAGE_DELETED = GatewayEventGeneric<"MESSAGE_DELETED", DeletedMessage>

type ROOM_CREATED = GatewayEventGeneric<"ROOM_CREATED", Room>
type ROOM_UPDATED = GatewayEventGeneric<"ROOM_UPDATED", Room>
type ROOM_DELETED = GatewayEventGeneric<"ROOM_DELETED", DeletedRoom>

type USER_SERVER_JOINED = GatewayEventGeneric<"SERVER_JOINED", Server>
type USER_SERVER_LEFT = GatewayEventGeneric<"SERVER_LEFT", Server>

type SERVER_MEMBER_JOINED = GatewayEventGeneric<"MEMBER_JOINED", ServerMember>
type SERVER_MEMBER_LEFT = GatewayEventGeneric<"MEMBER_LEFT", ServerMember>


type MESSAGE_EVENT = ROOM_MESSAGE_SEND | ROOM_MESSAGE_UPDATED | ROOM_MESSAGE_DELETED;
type ROOM_EVENT = ROOM_CREATED | ROOM_UPDATED | ROOM_DELETED;
type USER_EVENT = USER_SERVER_JOINED | USER_SERVER_LEFT;
type MEMBER_EVENT = SERVER_MEMBER_JOINED | SERVER_MEMBER_LEFT;

export type GatewayEvent = MESSAGE_EVENT | ROOM_EVENT | USER_EVENT | MEMBER_EVENT;
