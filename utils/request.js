/**
 * 基于axios封装的模块
 */

import axios from "axios"

//可以使用自定义配置新建一个 axios 实例
const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

//请求拦截器
// request.interceptors.request.use(function(config) {
//     //所有请求经过请求拦截器
//     //发送请求前 做一些公共的业务处理 例如 统一设置token
//     config.headers.Authorization = `Token `
//     // console.log(config)
//     return config;
// }, function(error) {
//     // 请求错误  此时请求还没发出去
// })

//响应拦截器

export default request