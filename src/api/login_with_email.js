import request from '@/utils/request'

export default async function LoginWithEmail(config) {
    const { data } = await request({
        ...config,
        method: 'POST',
        url: '/login'
    })
    return data
}