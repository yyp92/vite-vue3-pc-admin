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
                <el-form class="login-form">
                    <h1>Hello</h1>
                    <h2>欢迎来到甄选平台</h2>

                    <el-form-item>
                        <el-input
                            :prefix-icon="User"
                            v-model="loginForm.username"
                        />
                    </el-form-item>

                    <el-form-item>
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
    import {useRouter} from 'vue-router'
    import {ElNotification} from 'element-plus'
    import useUserStore from '@/store/modules/user'

    const $router = useRouter()
    const userStore = useUserStore()
    let loginForm = reactive({
        username: 'admin',
        password: '111111'
    })
    let loading = ref(false)


    const handleLogin = async () => {
        loading.value = true

        try {
            await userStore.userLogin(loginForm)
            $router.push('/')

            ElNotification({
                type: 'success',
                message: '登录成功'
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