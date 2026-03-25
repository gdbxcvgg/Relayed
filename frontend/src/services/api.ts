import axios from "axios";
import { refresh, isTokenExpired} from "./auth";



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

    config.validateStatus = () => true

    return config
})

export default api