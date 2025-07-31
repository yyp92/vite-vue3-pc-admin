<template>
    <div class="home">
        <h2>{{ userStore.username }}</h2>
    </div>
</template>

<script
    setup
    lang="ts"
    name="Home"
>
    import {onMounted} from 'vue'
    import useUserStore from '@/store/modules/user'

    const userStore = useUserStore()

    onMounted(() => {
        userStore.getUserInfo()
    })
</script>

<style
    scoped
    lang="scss"
>
    .home {}
</style>