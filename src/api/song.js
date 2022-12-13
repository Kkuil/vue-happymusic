import request from '@/utils/request'

export const SongUrl = async id => {
    const { data } = await request({
        method: 'GET',
        url: '/song/download/url',
        params: {
            id
        }
    })
    return data
}