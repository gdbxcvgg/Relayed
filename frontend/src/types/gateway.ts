import type { DeletedMessageType, MessageType } from "./message"
import type { DeletedRoomType, RoomType } from "./room";
import type { ServerType, ServerMemberType } from "./server";


type GatewayEventGeneric<T, K> = {
    opcode: number;
    type: T;
    data: K;
}

type ROOM_MESSAGE_SEND = GatewayEventGeneric<"MESSAGE_SEND", MessageType>
type ROOM_MESSAGE_UPDATED = GatewayEventGeneric<"MESSAGE_UPDATED", MessageType>
type ROOM_MESSAGE_DELETED = GatewayEventGeneric<"MESSAGE_DELETED", DeletedMessageType>

type ROOM_CREATED = GatewayEventGeneric<"ROOM_CREATED", RoomType>
type ROOM_UPDATED = GatewayEventGeneric<"ROOM_UPDATED", RoomType>
type ROOM_DELETED = GatewayEventGeneric<"ROOM_DELETED", DeletedRoomType>

type USER_SERVER_JOINED = GatewayEventGeneric<"SERVER_JOINED", ServerType>
type USER_SERVER_LEFT = GatewayEventGeneric<"SERVER_LEFT", ServerType>

type SERVER_MEMBER_JOINED = GatewayEventGeneric<"MEMBER_JOINED", ServerMemberType>
type SERVER_MEMBER_LEFT = GatewayEventGeneric<"MEMBER_LEFT", ServerMemberType>


type MESSAGE_EVENT = ROOM_MESSAGE_SEND | ROOM_MESSAGE_UPDATED | ROOM_MESSAGE_DELETED;
type ROOM_EVENT = ROOM_CREATED | ROOM_UPDATED | ROOM_DELETED;
type USER_EVENT = USER_SERVER_JOINED | USER_SERVER_LEFT;
type MEMBER_EVENT = SERVER_MEMBER_JOINED | SERVER_MEMBER_LEFT;

export type GatewayEventType = MESSAGE_EVENT | ROOM_EVENT | USER_EVENT | MEMBER_EVENT;
