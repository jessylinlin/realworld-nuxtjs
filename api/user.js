import request from '@/utils/request'

//用户登陆
export const login = data => {
    return request({
        method: 'POST',
        url: '/api/users/login',
        data
    })
}
//注册
export const register = data => {
    return request({
        method: 'POST',
        url: '/api/users',
        data
    })
}