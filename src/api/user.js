import request from '@/utils/request'

export const UserDetails =  async config => {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: '/user/detail'
    })
    return data
}