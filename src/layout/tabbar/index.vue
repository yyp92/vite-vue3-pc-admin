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
            ></el-button>

            <el-button
                size="small"
                icon="FullScreen"
                circle
            ></el-button>

            <el-button
                size="small"
                icon="Setting"
                circle
            ></el-button>

            <img
                src="../../../public/logo.png"
                class="avatar"
            />

            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>

                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
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
    import {useRoute} from 'vue-router'
    import useLayoutSettingStore from '@/store/modules/setting'

    const $route = useRoute()
    let layoutSettingStore = useLayoutSettingStore()

    const changeIcon = () => {
        layoutSettingStore.fold = !layoutSettingStore.fold
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