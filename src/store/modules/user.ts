import {defineStore} from 'pinia'
import {login} from '@/api/user'
import type {Login} from '@/api/user/type'
import {localCache} from '@/utils/cache'

const useUserStore = defineStore(
    'User',
    {
        state: () => {
            return {
                // 用户唯一标识
                token: localCache.getCache('TOKEN') || ''
            }
        },

        actions: {
            async userLogin(data: Login) {
                const result: any = await login(data)
                const {
                    code,
                    data: resData
                } = result ?? {}

                if (code === 200) {
                    const {token} = resData
                    this.token = token
                    localCache.setCache('TOKEN', token)

                    // 能保证当前 async 函数返回一个成功的 promise
                    return 'ok'
                }
                else {
                    return Promise.reject(new Error(resData?.message))
                }
            }
        },

        getters: {

        }
    }
)

export default useUserStore
