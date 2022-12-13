import request from '@/utils/request'

/* 歌单详情 */
export const AlbumDetails = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/album',
        params: {
            ...config
        }
    })
    return data
}

/* 最新专辑 */
export const LatestAlbums = async () => {
    const { data } = await request({
        method: 'GET',
        url: '/album/newest',
    })
    return data
}