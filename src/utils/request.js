import axios from 'axios'

// 请求端口号
const $port = 3031

const request = axios.create({
    baseURL: `http://127.0.0.1:${$port}`,
    timeout: 5000
})

request.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

request.interceptors.response.use(config => {
    const { data: { cookie } } = config
    if (cookie) {
        const temp = cookie.split(';')
        for (var i = 0; i < temp.length; i++) {
            const t = temp.slice(i * 5, i * 5 + 5).join(';')
            if(t) {
                document.cookie = t
            }
        }
    }
    return config
}, error => {
    return Promise.reject(error)
})

export default request