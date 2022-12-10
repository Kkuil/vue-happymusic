import request from '@/utils/request'

/* 歌手详情 */
export const SingerDetails = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/artist/detail',
        params: {
            ...config
        }
    })
    return data
}

/* 歌手粉丝数 */
export const SingerFansCount = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/artist/follow/count',
        params: {
            ...config
        }
    })
    return data
}

/* 推荐艺人 */
export const RecommendSingers = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/top/artists',
        params: {
            offset: 0,
            limit: 5,
            ...config
        },
    })
    return data
}

/* 歌手mv */
export const SingerMV = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/artist/mv',
        params: {
            ...config
        }
    })
    return data
}

/* 歌手热门歌曲 */
export const SingerHotSongs = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/artist/top/song',
        params: {
            ...config
        }
    })
    return data
}