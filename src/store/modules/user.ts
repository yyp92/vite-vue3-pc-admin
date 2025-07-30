import {defineStore} from 'pinia'
import {login} from '@/api/user'
import type {Login, LoginResponse} from '@/api/user/type'
import {localCache} from '@/utils/cache'

interface UserState {
    token: string | null
}

const useUserStore = defineStore(
    'User',
    {
        state: (): UserState => {
            return {
                // 用户唯一标识
                token: localCache.getCache('TOKEN') || ''
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
            }
        },

        getters: {

        }
    }
)

export default useUserStore
