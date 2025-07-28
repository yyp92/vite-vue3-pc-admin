import { createApp } from 'vue'
import 'dayjs/locale/zh-cn'

// 注册整个项目的全局组件
import globalComponentPlugin from './components/index'
import App from '@/App.vue'
import router from '@/router/index'

import '@/assets/iconfont/iconfont.css' 
import '@/styles/index.scss'


const app = createApp(App)

app.use(globalComponentPlugin)
app.use(router)

app.mount('#app')
