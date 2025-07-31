import type { App, Plugin } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入项目中的全部的全局组件
// import Test from '@/components/Test/index.vue'

// 全局对象
const allGlobalComponents: any = {
    // Test,
    ...ElementPlusIconsVue
}

// 对外暴露插件对象
const globalComponentPlugin: Plugin =  {
    // 这个必须叫做 install 方法
    install(app: App) {
        // 注册项目全部的全局组件
        Object.keys(allGlobalComponents).forEach((key: string) => {
            // 注册为全局组件
            app.component(key, allGlobalComponents[key])
        })
    }
}

export default globalComponentPlugin
