import axios from "../utils/axios";
import { setToken } from "../utils/token";
import { TokenData } from "../models/authModel";

export const refreshToken = async () => {
    const tokenJson = localStorage.getItem('token');
    if (tokenJson) {
        const tokenData: TokenData = JSON.parse(tokenJson);
        const refreshToken = await axios.post('auth/refresh', { token: tokenData.value });
        if (refreshToken.status === 200) {
            const newToken = refreshToken.data.token;
            setToken(newToken);
            return newToken;
        }
    }
    return null;
}

export const registry = async (username: string, password: string, phonenumber: string) => {
    const response = await axios.post('auth/registry', { userName: username, password, phoneNumber: phonenumber });
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Registry failed');
    }
};

export const login = async (username: string, password: string) => {
    const response = await axios.post('auth/login', { userName: username, password });
    if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        return response.data.user;
    } else {
        throw new Error('Login failed');
    }
};