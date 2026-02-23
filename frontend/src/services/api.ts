import axios from "axios";
import {jwtDecode} from 'jwt-decode';
import { refresh } from "./auth";



const isTokenExpired = (token:string): boolean => {
    try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        if (!decodedToken.exp) return true
        return decodedToken.exp < currentTime
    } catch (error) {
        console.log('Error decoding token: ', error)
        return true
    }
}


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})


api.interceptors.request.use(async (config) => {
    let access = localStorage.getItem('access') 
    
    if (access && isTokenExpired(access)) {
        localStorage.removeItem('access')

        await refresh()
        access = localStorage.getItem('access')
    }

    if (access){
        config.headers.Authorization = `Bearer ${access}`
    }

    return config
})

export default api