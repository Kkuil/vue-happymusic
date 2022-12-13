import request from '@/utils/request'

export const Search = async ({ keywords, type = 1 }) => {
    const { data } = await request({
        method: 'GET',
        url: '/cloudsearch',
        params: {
            keywords,
            type
        }
    })
    return data
}