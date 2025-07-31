<template>
    <div
        class="logo"
        v-if="config.logoHidden"
    >
        <img
            :src="config.logo"
            alt=""
        />

        <div>{{ config.title }}</div>
    </div>
</template>

<script
    setup
    lang="ts"
    name="Logo"
>
    import config from '@/config'
</script>

<style
    scoped
    lang="scss"
>
    .logo {
        flex-shrink: 0;
        width: $base-menu-width;
        height: $base-logo-height;
        color: #fff;
        display: flex;
        align-items: center;
        font-size: $base-logo-text-fontSize;
        padding-left: 12px;

        img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            margin-right: 12px;
        }
    }
</style>