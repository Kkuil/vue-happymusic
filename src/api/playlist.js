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
