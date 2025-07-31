import request from '@/utils/request'
import type {Login, LoginResponse, UserInfoResponse} from './type'

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL='/user/info'
}

export const login = (data: Login) => {
    return request.post<any, LoginResponse>(
        API.LOGIN_URL,
        data
    )
}

export const reqUserInfo = () => {
    return request.get<any, UserInfoResponse>(
        API.USERINFO_URL
    )
}
