/**
 * 基于axios封装的模块
 */

import axios from "axios"

//可以使用自定义配置新建一个 axios 实例
const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})

//请求拦截器

//响应拦截器

export default request