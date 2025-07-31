<template>
    <template
        v-for="(item, index) in menuList"
        :key="item.path"
    >
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item
                v-if="!item.meta.hidden"
                :index="item.path"
                @click="goRoute"
            >
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>


        <!-- 有子路由，但是只有一个子路由-->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item
                v-if="!item.children[0].meta.hidden"
                :index="item.children[0].path"
                @click="goRoute"
            >
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>

                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由且个数大于一个 -->
        <el-sub-menu
            v-if="item.children && item.children.length > 1"
            :index="item.path"
        >
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>

                <span>{{ item.meta.title }}</span>
            </template>

            <!-- 递归组件，必须有名字 -->
            <Side
                :menuList="item.children"
            />
        </el-sub-menu>
    </template>
</template>

<script
    setup
    lang="ts"
    name="Side"
>
    import {useRouter} from 'vue-router'

    const $router = useRouter()

    // 点击菜单的回调
    const goRoute = (vc: any) => {
        $router.push(vc.index)
    }

    defineProps(['menuList'])
</script>

<script lang="ts">
    export default {
        name: 'Side'
    }
</script>

<style
    scoped
    lang="scss"
>

</style>