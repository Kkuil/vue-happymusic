import request from '@/utils/request'

/* 歌单详情 */
export const PlayListDetails = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/playlist/detail',
        params: {
            ...config
        }
    })
    return data
}

/* 歌单目录 */
export const TopPlaylist = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/top/playlist',
        params: {
            ...config
        }
    })
    return data
}

/* 推荐歌单 */
export const RecommendList = async config => {
    const { data } = await request({
        method: 'GET',
        url: 'personalized',
        params: {
            ...config
        }
    })
    return data
}

/* 精品歌单 */
export const HighQualityPlaylist = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/top/playlist/highquality',
        params: {
            limit: 50,
            ...config
        }
    })
    return data
}