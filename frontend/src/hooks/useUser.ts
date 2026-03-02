import {use} from 'react'
import UserContext from '../contexts/UserContext';

const useUser = () => {
    const context = use(UserContext)

    if(!context) {
        throw Error('useUser needs to be inside UserContext')
    }

    return context
}


export default useUser;