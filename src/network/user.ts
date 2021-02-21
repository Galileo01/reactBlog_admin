import axios, { errHandler } from './index';

export function login(info: { username: string; password: string }) {
    return axios.post<{
        ok: number;
        data: string;
    }>('/user/login', info);
}


