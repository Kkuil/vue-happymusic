import request from '@/utils/request'

export default async function GetPlaylistDetails(config) {
    const { data } = await request({
        method: 'GET',
        url: '/playlist/detail',
        params: {
            ...config
        }
    })
    return data
}