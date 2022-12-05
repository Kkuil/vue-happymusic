import request from '@/utils/request'

export default async function GetKeys(config) {
    const { data } =  await request({
        ...config,
        method: 'GET',
        url: '/login/qr/key'
    })
    return data
}