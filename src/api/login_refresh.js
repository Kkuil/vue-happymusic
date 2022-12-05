import request from '@/utils/request'

export default async function LoginRefresh() {
    return await request({
        method: 'GET',
        url: '/login/refresh'
    })
}