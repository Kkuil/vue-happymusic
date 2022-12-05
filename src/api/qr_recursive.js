import request from '@/utils/request'

export default async function StatusRecursive({ key }) {
    const { data } =  await request({
        method: 'GET',
        url: '/login/qr/check',
        params: {
            key
        }
    })
    return data
}