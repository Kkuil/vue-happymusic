import request from '@/utils/request'

/* 邮箱登录 */
export const LoginWithEmail = async config => {
    const { data } = await request({
        ...config,
        method: 'POST',
        url: '/login'
    })
    return data
}

/* 手机号登录 */
export const LoginWithPhone = async config => {
    const { data } = await request({
        ...config,
        method: 'POST',
        url: '/login/cellphone'
    })
    return data
}

/* 二维码登录 */
// 获取unikey
export const QRKey = async config => {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: '/login/qr/key'
    })
    return data
}
// 获取base64二维码
// 获取keys
const { data } = await QRKey()
const unikey = data.unikey
export const QRBase64 = async config => {
    const { data } = await request({
        ...config,
        method: 'GET',
        url: '/login/qr/create',
        params: {
            key: unikey
        }
    })
    return { ...data, key: unikey }
}
/* 轮询访问登录状态 */
export const QRRecursive = async ({ key }) =>  {
    const { data } =  await request({
        method: 'GET',
        url: '/login/qr/check',
        params: {
            key
        }
    })
    return data
}

/* 刷新登录 */
export const RefreshLogin = async () => {
    return await request({
        method: 'GET',
        url: '/login/refresh'
    })
}