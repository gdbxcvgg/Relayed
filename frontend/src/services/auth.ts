import axios from "axios";
import api from "./api"


interface RegisterData {
    email: string;
    username: string;
    password: string;
    display_name?: string;
    date_of_birth: string;
}

export const register = async (data: RegisterData): Promise<boolean> => {
    try{
        const res = await api.post('auth/register', data)
        return res.status === 201
    } catch (error) {
        console.error(error)
        return false
    }
}


interface LoginResponse {
    refresh?: string;
    access?: string;
}

export const login = async (email:string, password:string): Promise<boolean> => {
    try {
        const res = await api.post<LoginResponse>('auth/token', {email, password})

        if (!res.data.access || !res.data.refresh) return false
        
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}


interface RefreshResponse {
    access?: string;
}

export const refresh = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem('refresh')
    if (!refreshToken) return false

    try {
        const res = await axios.post<RefreshResponse>(`${api.defaults.baseURL}/auth/refresh`, {refresh: refreshToken})

        if (!res.data.access) return false
        localStorage.setItem('access', res.data.access)

        return true
    } catch (error){
        console.error(error)
        return false
    }
}