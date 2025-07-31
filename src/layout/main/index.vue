<template>
    <router-view v-slot="{ Component }">
        <!-- 过渡动画 -->
        <transition name="fade">
            <component
                :is="Component"
                v-if="flag"
            />
        </transition>
    </router-view>
</template>

<script
    setup
    lang="ts"
    name="Content"
>
    import {ref, watch, nextTick} from 'vue'
    import useLayoutSettingStore from '@/store/modules/setting'

    let layoutSettingStore = useLayoutSettingStore()
    // 控制当前组件是否销毁重建
    let flag = ref(true)

    // 监听刷新的数据
    watch(
        () => layoutSettingStore.refresh,
        () => {
            // 点击刷新按钮：路由组件销毁
            flag.value = false

            // 在销毁之后再重新创建
            nextTick(() => {
                flag.value = true
            })
        }
    )
</script>

<style
    scoped
    lang="scss"
>  
    .fade-enter-from {
        opacity: 0;
        transform: scale(0);
    }

    .fade-enter-active {
        transition: all .3s;
    }

    .fade-enter-to {
        opacity: 1;
        transform: scale(1);
    }
</style>