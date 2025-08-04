<template>
    <div class="layout-container">
        <div
            class="layout-side"
            :class="{fold: layoutSettingStore.fold ? true : false}"
        >
            <Logo />

            <el-scrollbar class="menu-container">
                <el-menu
                    class="menu-inner"
                    background-color="#fff"
                    text-color="#363A45"
                    :default-active="$route.path"
                    :collapse="layoutSettingStore.fold"
                >
                    <Side
                        :menuList="userStore.menuRoutes"
                    />
                </el-menu>
            </el-scrollbar>
        </div>

        <div class="layout-main">
            <div class="tabbar">
                <Tabbar />
            </div>

            <div class="content">
                <Content />
            </div>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
    name="Layout"
>
    import {useRoute} from 'vue-router'
    import Logo from './logo/index.vue'
    import Side from './side/index.vue'
    import Content from './main/index.vue'
    import Tabbar from './tabbar/index.vue'
    import useUserStore from '@/store/modules/user'
    import useLayoutSettingStore from '@/store/modules/setting'

    const $route = useRoute()
    const userStore = useUserStore()
    let layoutSettingStore = useLayoutSettingStore()
</script>

<style
    scoped
    lang="scss"
>
    .layout-container {
        width: 100%;
        height: 100%;
        display: flex;

        .layout-side {
            width: $base-menu-width;
            height: 100%;
            background: $base-menu-background;
            display: flex;
            flex-direction: column;
            color: #fff;
            transition: all 0.3s;
            border-right: 1px solid $base-border-color;

            .menu-container {
                flex: 1;

                .menu-inner {
                    border-right: none;
                }
            }

            &.fold {
                width: $base-menu-min-width;
            }
        }

        .layout-main {
            flex: 1;
            display: flex;
            flex-direction: column;

            .tabbar {
                flex-shrink: 0;
                height: $base-tabbar-height;
            }

            .content {
                flex: 1;
                overflow-y: auto;
                padding: 12px;
            }
        }
    }
</style>