<template>
    <div class="login-container">
        <el-row>
            <el-col
                :span="12"
                :xs="0"
            ></el-col>

            <el-col
                :span="12"
                :xs="24"
            >
                <el-form
                    class="login-form"
                    :model="loginForm"
                    :rules="rules"
                    ref="loginFormRef"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到甄选平台</h2>

                    <el-form-item prop="username">
                        <el-input
                            :prefix-icon="User"
                            v-model="loginForm.username"
                        />
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            :prefix-icon="Lock"
                            v-model="loginForm.password"
                            show-password
                        />
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            class="login-btn"
                            type="primary"
                            size="default"
                            @click="handleLogin"
                            :loading="loading"
                        >登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script
    setup
    lang="ts"
    name="Login"
>
    import { User, Lock } from '@element-plus/icons-vue'
    import {reactive, ref} from 'vue'
    import {useRouter, useRoute} from 'vue-router'
    import {ElNotification} from 'element-plus'
    import type { FormInstance } from 'element-plus'
    import useUserStore from '@/store/modules/user'
    import {getTimeText} from '@/utils/time'

    const $router = useRouter()
    const $route = useRoute()
    const userStore = useUserStore()
    const loginFormRef = ref()
    let loginForm = reactive({
        username: 'admin',
        password: '111111'
    })
    let loading = ref(false)

    /**
     * * 自定义校验函数
     * @param rule 校验规则对象
     * @param value 表单元素文本内容
     * @param callback 函数，如果符合条件callback放行通过。如果不符合条件，callback注入错误提示信息
     */
    const validatorUserName = (rule: any, value: any, callback: any) => {
        if (value.length >= 5) {
            callback()
        }
        else {
            callback(new Error('账号长度至少五位'))
        }
    }

    const rules = {
        username: [
            // {
            //     required: true,
            //     min: 6,
            //     max: 10,
            //     message: '账号长度至少六位',
            //     trigger: 'change'
            // },

            {
                validator: validatorUserName,
                trigger: 'change'
            }
        ],
        password: [
            {
               required: true,
                min: 6,
                max: 15,
                message: '密码长度至少六位',
                trigger: 'change' 
            }
        ]
    }


    const handleLogin = async () => {
        // 全部表单项校验通过再发请求
        await loginFormRef.value.validate()

        loading.value = true

        try {
            await userStore.userLogin(loginForm)

            // 判断登录的时候，路由路径当中是否有query参数，如果有就往query参数跳转，没有跳转到首页
            const redirect: any = $route.query.redirect
            $router.push({path: redirect || '/'})

            ElNotification({
                type: 'success',
                title: `HI，${getTimeText()}好`,
                message: '欢迎回来'
            })
        }
        catch(error) {
            ElNotification({
                type: 'error',
                message: (error as Error).message
            })
        }
        finally {
            loading.value = false
        }
    }
</script>

<style scoped lang="scss">
    .login-container {
        width: 100%;
        height: 100vh;
        background: url('@/assets/images/background.jpg') no-repeat;
        background-size: cover;

        .login-form {
            width: 80%;
            position: relative;
            top: 30vh;
            background: url('@/assets/images/login_form.png') no-repeat;
            background-size: cover;
            padding: 40px;

            h1 {
                color: white;
                font-size: 40px;
            }

            h2 {
                font-size: 20px;
                color: white;
                margin: 20px 0px;
            }

            .login-btn {
                width: 100%;
            }
        }
    }
</style>