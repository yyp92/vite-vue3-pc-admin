import {defineStore} from 'pinia'

const useLayoutSettingStore = defineStore(
    'SettingStore',
    {
        state: () => {
            return {
                // 用于控制菜单是展开还是收起
                fold: false,

                // 用于控制刷新效果
                refresh: false,
            }
        }
    }
)

export default useLayoutSettingStore
