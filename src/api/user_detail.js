import request from '@/utils/request'

export default async function(config) {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: '/user/detail'
    })
    return data
}