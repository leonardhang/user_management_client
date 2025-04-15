import { TokenData } from "../models/authModel";

const expiresInSec = 60 * 60 * 24 * 1000;

export const getToken = () => {
    return localStorage.getItem('token');
}

export const setToken = (token: string) => {
    if (token !== null && token !== undefined) {
        const expiresAt = Date.now() + expiresInSec - 30 * 60 * 1000;
        const data: TokenData = {
            value: token,
            expiresAt,
        };
        localStorage.setItem('token', JSON.stringify(data));
    }
}

export const removeToken = () => {
    localStorage.removeItem('token');
}