import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            // 相对路径别名配置，使用 @ 代替 src
            '@': path.resolve("./src"),
        },
    },

    plugins: [
        vue(),

        AutoImport({
            resolvers: [
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),

                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
            ],
        }),
        Components({
            resolvers: [
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),

                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
            ],

            // 自动导入 ts， 否则使用组件不会提示
            dts: path.resolve(path.resolve("./src"), 'components.d.ts'),
        }),

        Icons({
            autoInstall: true,
        }),
    ],

    // scss 全局变量的配置
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@/styles/variable.scss";'
            }
        }
    }
})
