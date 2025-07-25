import { createApp } from 'vue'
import 'dayjs/locale/zh-cn'
import '@/assets/iconfont/iconfont.css' 

// 注册整个项目的全局组件
import globalComponentPlugin from './components/index'
import App from '@/App.vue'
import '@/styles/index.scss'


const app = createApp(App)

app.use(globalComponentPlugin)

app.mount('#app')
