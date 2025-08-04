// * 路由鉴权
import router from '@/router'
import pinia from './store'
import useUserStore from './store/modules/user'
import config from './config'

const userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    // to: 将要访问那个路由
    // from: 从那哪个路由来的
    // next: 路由的放行函数

    document.title = `${config.title}-${to.meta.title}`

    // 获取 token，去判断用户登录、还是未登录
    const token = userStore.token
    // 获取用户名字
    const username = userStore.username

    // 用户登录，可以访问其它页，拒绝访问登录页
    if (token) {
        // 登录成功，访问 login，不能访问，指向首页
        if (to.path == '/login') {
            next({path: '/'})
        }
        else {
            // 有用户信息
            if (username) {
                next()
            }
            else {
                // 如果没有用户信息，在守卫这里发请求获取到了用户信息在放行
                try {
                    await userStore.getUserInfo()
                    next()
                }
                // 1：token过期， 2：用户手动修改本地存储的token
                catch(error) {
                    userStore.userLogout()

                    next({
                        path: '/login',
                        query: {
                            redirect: to.path
                        }
                    })
                }
            }
        }
    }
    // 用户未登录，可以访问登录页，拒绝访问其它页
    else {
        if (to.path == '/login') {
            next()
        }
        else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }
    }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
})
