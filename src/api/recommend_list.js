import request from '@/utils/request'

/* 推荐歌单列表 */
export const RecommendList = async config => {
    const { data } = await request({
        method: 'GET',
        url: 'personalized',
        params: {
            limit: 10,
            ...config
        }
    })
    return data
}