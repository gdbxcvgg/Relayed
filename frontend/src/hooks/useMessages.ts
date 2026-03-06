import {use} from 'react'
import MessagesContext from '../contexts/MessagesContext';

const useMessages = () => {
    const context = use(MessagesContext)

    if(!context) {
        throw Error('useMessages needs to be inside MessagesContext')
    }

    return context
}


export default useMessages;