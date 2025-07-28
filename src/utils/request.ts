// * axios 二次封装
import axios from 'axios'
import type {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from 'axios'
import { ElMessage } from 'element-plus';

// 成功响应的数据结构（后端返回的 response.data 格式）
interface ApiSuccessData<T = any> {
    // 成功状态码
    code: 200;
    // 提示信息 
    message: string; 
    // 实际业务数据（泛型，根据接口动态变化）
    data: T; 
}

// 错误响应的数据结构（后端返回的 response.data 格式）
interface ApiErrorData {
    // 非 200 的错误码
    code: number;
    // 错误信息 
    message: string; 
}


const request: AxiosInstance = axios.create({
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 超时时间
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    return config
})

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (error) => {
        // * 处理网络错误
        // 存储网络错误信息
        let message = ''
        const status = error.response.statusCode

        switch(status) {
            case 401:
                message = 'TOKEN 过期'
                break

            case 403:
                message = '无权访问'
                break

            case 404:
                message = '请求地址错误'
                break

            case 500:
                message = '服务器出现问题'
                break

            default:
                message = '网络出现问题'
        }

        ElMessage({
            type: 'error',
            message
        })

        return Promise.reject(error)
    }
)

export default request
