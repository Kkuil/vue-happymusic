import request from '@/utils/request'

export const Lyrics = async id => {
    const { data } = await request({
        method: 'GET',
        url: '/lyric',
        params: {
            id
        }
    })
    return data
}