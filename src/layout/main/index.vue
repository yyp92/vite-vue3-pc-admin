<template>
    <router-view v-slot="{ Component }">
        <!-- 过渡动画 -->
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script
    setup
    lang="ts"
    name="Content"
>
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