import API from './api';

export async function signup(data){
    const res = await API.post('auth/signup',data);
    return res.data.token;
}
export async function login(data){
    const res = await API.post('/auth/login',data);
    return res.data.token;
}