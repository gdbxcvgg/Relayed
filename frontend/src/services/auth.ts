import axios from "axios";
import api from "./api"
import {jwtDecode} from 'jwt-decode';


interface RegisterData {
    email: string;
    username: string;
    password: string;
    display_name?: string | null;
    date_of_birth: string;
}

type ErrorType = {
    email?: string;
    username?: string;
    password?: string;
    display_name?: string;
    date_of_birth?: string;
};

export const register = async (data: RegisterData): Promise<[boolean, ErrorType?]> => {
    const res = await api.post('auth/register', data)
    return [res.status === 201, res.data]
}


interface LoginResponse {
    refresh?: string;
    access?: string;
}

export const login = async (email:string, password:string): Promise<[boolean, ErrorType?]> => {
    const ERROR = "Email or password is invalid.";

    const res = await api.post<LoginResponse>('auth/token', {email, password})


    if (!res.data.access || !res.data.refresh) return [false, {email: ERROR, password: ERROR}]
    
    localStorage.setItem('access', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)

    return [true]
    
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


export const isTokenExpired = (token:string): boolean => {
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