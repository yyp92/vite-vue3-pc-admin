<template>
    <div class="layout-container">
        <div class="layout-side">
            <Logo />

            <el-scrollbar class="menu-container">
                <el-menu
                    class="menu-inner"
                    background-color="#001529"
                    text-color="white"
                >
                    <Side
                        :menuList="userStore.menuRoutes"
                    />
                </el-menu>
            </el-scrollbar>
        </div>

        <div class="layout-main">
            <div class="tabbar">2</div>

            <div class="content">
                3
                <p style="height: 10000px;"></p>
            </div>
        </div>
    </div>
</template>

<script
    setup
    lang="ts"
    name="Layout"
>
    import Logo from './logo/index.vue'
    import Side from './side/index.vue'
    import useUserStore from '@/store/modules/user'

    const userStore = useUserStore()
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

            .menu-container {
                flex: 1;

                .menu-inner {
                    border-right: none;
                }
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
                padding: 20px;
            }
        }
    }
</style>