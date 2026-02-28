import {use} from 'react'
import { RoomContext } from '../contexts/RoomContext';

const useRoom = () => {
    const context = use(RoomContext)

    if(!context) {
        throw Error('useRoom needs to be inside RoomContext')
    }

    return context
}


export default useRoom;