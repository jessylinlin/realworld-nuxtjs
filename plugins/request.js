/**
 * 基于axios封装的模块
 */

import axios from "axios"

//可以使用自定义配置新建一个 axios 实例
//创建请求对象
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

//通过插件机制获取上下文对象context query params req res app store...
//插件导出函数 必须作为default成员
export default ({ store }) => {
    request.interceptors.request.use(function(config) {
        //所有请求经过请求拦截器
        //发送请求前 做一些公共的业务处理 例如 统一设置token
        const { user } = store.state
        console.log(user)
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function(error) {
        // Do something with request error
        // 请求错误  此时请求还没发出去
    });
}