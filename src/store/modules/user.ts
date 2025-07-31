import {defineStore} from 'pinia'
import type {RouteRecordRaw} from 'vue-router'
import {login, reqUserInfo} from '@/api/user'
import type {Login, LoginResponse} from '@/api/user/type'
import {localCache} from '@/utils/cache'
// 常量路由
import {constantRoute} from '@/router/route'

interface UserState {
    token: string | null,
    menuRoutes: RouteRecordRaw[],
    username: string,
    avatar: string
}

const useUserStore = defineStore(
    'User',
    {
        state: (): UserState => {
            return {
                // 用户唯一标识
                token: localCache.getCache('TOKEN') || '',
                menuRoutes: constantRoute,
                username: '',
                avatar: ''
            }
        },

        actions: {
            async userLogin(data: Login) {
                const result: LoginResponse = await login(data)
                const {
                    code,
                    data: resData
                } = result ?? {}

                if (code === 200) {
                    const {token} = resData
                    this.token = (token as string)
                    localCache.setCache('TOKEN', token)

                    // 能保证当前 async 函数返回一个成功的 promise
                    return 'ok'
                }
                else {
                    return Promise.reject(new Error(resData?.message ))
                }
            },

            // 获取用户信息
            async getUserInfo() {
                const result = await reqUserInfo()
                const {
                    code,
                    data: resData
                } = result ?? {}

                if (code === 200) {
                    const {username, avatar} = resData?.checkUser ?? {}
                    this.username = username
                    this.avatar = avatar
                }
                else {
                    
                }
            }
        },

        getters: {

        }
    }
)

export default useUserStore
