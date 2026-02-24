import {use} from 'react'
import { ServerContext } from '../contexts/ServerContext';

const useServer = () => {
    const context = use(ServerContext)

    console.log(context)

    if(!context) {
        throw Error('useServer needs to be inside ServerProvider')
    }

    return context
}


export default useServer;