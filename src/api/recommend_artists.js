import request from '@/utils/request'

export default async function GetRecommendArtists(config) {
    const { data } = await request({
        method: 'GET',
        url: '/top/artists',
        params: {
            offset: 0,
            limit: 5
        },
        ...config,
    })
    return data
}