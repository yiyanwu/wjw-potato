import axios from 'axios'
import history from './history'

const appId = "sv2eTjKsNCV5BkjXfBRuMHgo"
const appSecret = "CtvAYi3xZp9G12Ld2yMzQL8T"

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    // timeout: 1000,
    headers: {
        't-app-id' : appId,
        't-app-secret' : appSecret
    }
});

instance.interceptors.request.use(function (config) {
    const xToken = localStorage.getItem( 'x-token')
    if(xToken) {
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
}, function (error) {
    console.error(error)
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    const token = response.headers['x-token']
    if(token) {
        localStorage.setItem('x-token',token)
    }
    return response;
}, function (error) {
    if(error.response.status === 401) {
        history.push('/login');
    }
    return Promise.reject(error);
});

export default instance