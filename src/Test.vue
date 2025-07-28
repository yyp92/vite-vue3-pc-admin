<template>
    <el-config-provider
        :locale="zhCn"
    >
        <div>111</div>
        <el-button
            :icon="Plus"
            type="primary"
        >I am ElButton</el-button>

        <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        />

        <el-color-picker show-alpha size="large" />

        <span class="iconfont icon-quanping"></span>
    </el-config-provider>
</template>

<script setup lang="ts">
    import { Plus } from '@element-plus/icons-vue';
    import { ElConfigProvider } from 'element-plus'
    import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style
    scoped
    lang="scss"
>
</style>
