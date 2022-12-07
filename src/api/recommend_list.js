import request from '@/utils/request'

export default async function GetRecommendList(config) {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: 'personalized?limit=10&realIP=211.161.244.70'
    })
    return data
}