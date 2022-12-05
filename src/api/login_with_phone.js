import request from '@/utils/request'

export default async function LoginWithPhone(config) {
    const { data } = await request({
        ...config,
        method: 'POST',
        url: '/login/cellphone'
    })
    return data
}