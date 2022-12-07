import request from '@/utils/request'

export default async function GetTopList(config) {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: '/toplist'
    })
    return data
}