<template>
    <div class="tabbar-inner">
        <div class="left">
            <el-icon
                style="margin-right: 10px; cursor: pointer;"
                @click="changeIcon"
            >
                <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
            </el-icon>

            <el-breadcrumb
                separator-icon="ArrowRight"
            >
                <el-breadcrumb-item
                    v-for="(item, index) in $route.matched"
                    :key="index"
                    v-show="item.meta.title"
                    :to="item.path"
                >
                    <div class="breadcrumb-item-inner">
                        <el-icon style="margin-right: 5px;">
                            <component :is="item.meta.icon"></component>
                        </el-icon>

                        <span>{{ item.meta.title }}</span>
                    </div>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="right">
            <el-button
                size="small"
                icon="Refresh"
                circle
                @click="handleRefresh"
            ></el-button>

            <el-button
                size="small"
                icon="FullScreen"
                circle
                @click="handleFullScreen"
            ></el-button>

            <el-button
                size="small"
                icon="Setting"
                circle
            ></el-button>

            <img
                :src="userStore.avatar"
                class="avatar"
            />

            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.username}}

                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            @click="handleLogout"
                        >退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
    name="Tabbar"
>
    import {useRoute, useRouter} from 'vue-router'
    import useLayoutSettingStore from '@/store/modules/setting'
    import useUserStore from '@/store/modules/user'

    const $route = useRoute()
    const $router = useRouter()
    let layoutSettingStore = useLayoutSettingStore()
    const userStore = useUserStore()


    const changeIcon = () => {
        layoutSettingStore.fold = !layoutSettingStore.fold
    }

    const handleRefresh = () => {
        layoutSettingStore.refresh = !layoutSettingStore.refresh
    }

    const handleFullScreen = () => {
        // dom对象的一个属性：可以用来判断当前是不是全屏模式
        // 全屏：true， 不是全屏：false
        const full = document.fullscreenElement

        if (!full) {
            document.documentElement.requestFullscreen()
        }
        else {
            document.exitFullscreen()
        }
    }

    const handleLogout = () => {
        // 1. 需要向服务器发送请求[退出登录接口(告诉服务本次token失效)]
        // 2. 状态管理库中清空相关的数据（token, username, avatar）
        // 3. 跳转到登录页

        userStore.userLogout()
        $router.push({
            path: '/login',
            query: {
                redirect: $route.path
            }
        })
    }
</script>

<style
    scoped
    lang="scss"
>
    .tabbar-inner {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 12px;;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid $base-border-color;

        .left,
        .right {
            display: flex;
            align-items: center;
        }

        .avatar {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            margin: 12px;
        }

        .left {
            .breadcrumb-item-inner {
                display: flex;
                align-self: center;
            }
        }
    }
</style>