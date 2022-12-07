import request from '@/utils/request'

export default async function GetLatestAlbums(config) {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: '/album/newest'
    })
    return data
}