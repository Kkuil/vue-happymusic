import axios from 'axios'
import nprogress from 'nprogress'
import { setCookies, getCookies } from '@/utils/auth.js'

// 请求端口号
const $port = 3031

const baseURL = `http://127.0.0.1:${$port}`


const request = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 5000
})

request.interceptors.request.use(config => {
    nprogress.start()
    if (!config.params) config.params = {};
    if (baseURL.length) {
        if (baseURL[0] !== '/') {
            config.params.cookie = getCookies('MUSIC_U');;
        }
    } else {
        console.error("You must set up the baseURL in the service's config");
    }

    if (!config.url.includes('/login')) {
        config.params.realIP = '211.161.244.70';
    }
    return config;
}, error => {
    return Promise.reject(error);
});

request.interceptors.response.use(config => {
    const { data: { cookie } } = config
    cookie || setCookies(cookie)
    nprogress.done()
    return config
}, error => {
    return Promise.reject(error)
})

export default request