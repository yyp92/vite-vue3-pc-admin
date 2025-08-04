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
        box-sizing: border-box;
        flex-shrink: 0;
        width: $base-menu-width;
        height: $base-logo-height;
        color: $base-text-color;
        display: flex;
        align-items: center;
        font-size: $base-logo-text-fontSize;
        padding-left: 12px;
        border-bottom: 1px solid $base-border-color;

        img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            margin-right: 12px;
        }
    }
</style>