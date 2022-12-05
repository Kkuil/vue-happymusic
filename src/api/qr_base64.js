import request from '@/utils/request'
import GetKeys from '@/api/qr_keys'

// 获取keys
const { data } = await GetKeys()
const unikey = data.unikey

export default async function GetQR_BASE64(config) {
    const { data } =  await request({
        ...config,
        method: 'GET',
        url: '/login/qr/create',
        params: {
            key: unikey
        }
    })
    return { ...data, key: unikey }
}