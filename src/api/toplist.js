import request from '@/utils/request'

/* 榜单列表 */
export const TopList = async config => {
    const { data } = await request({
        method: 'GET',
        url: '/toplist',
        ...config
    })
    return data
}