import axios from "axios";

import qs from 'qs'
import { message } from "ant-design-vue";

const instance = axios.create({
    baseURL: "http://192.168.12.62:3333/",
    timeout: 3000,
    // headers:{
    //     // "Content-Type":"application/json",
    //     // Authorization:String(localStorage.getItem('token'))
    // }

})

// 添加拦截器
instance.interceptors.request.use(
    (config) => {
        config.data = qs.stringify(config.data)
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    }
)
// 添加响应拦截器
instance.interceptors.response.use(
    (res) => {
        // 对响应数据做什么
        return Promise.resolve(res.data)
    },
    (error) => {
        // 对响应错误做什么
        console.log(error)
        message.error('服务器错误！请联系管理员！')
        return Promise.reject(error)
    }
)

export default instance