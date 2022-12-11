import request from '@/utils/request'

/* mv详情 */
export const MvAddress = async ({ id }) => {
    const { data } = await request({
        method: 'GET',
        url: '/mv/url',
        params: {
            id
        }
    })
    return data
}

/* mv详情 */
export const MvDetails = async ({ mvid }) => {
    const { data } = await request({
        method: 'GET',
        url: '/mv/detail',
        params: {
            mvid
        }
    })
    return data
}

/* 相似mv */
export const SimilarMvs = async ({ mvid }) => {
    const { data } = await request({
        method: 'GET',
        url: '/simi/mv',
        params: {
            mvid
        }
    })
    return data
}