export interface Login {
    username: string,
    password: string
}

interface LoginResponseData {
    token: string
}

export interface LoginResponse {
    code: number,
    data: LoginResponseData
}

interface CheckUser {
    userId: number,
    avatar: string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string
}

export interface UserInfoResponse {
    code: number,
    data: {
        checkUser: CheckUser
    }
}
