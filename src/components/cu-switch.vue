<template>
    <el-tooltip :disabled="!data.introduce" class="item" effect="light" :content="data.introduce" placement="top-start">
    </el-tooltip>
</template>

<script>
    export default {
        name: "cu-switch",
        model: {
            "prop": "data",
            "event": "change"
        },
        props: ["data","lazy"],
    }
</script>

<style scoped>

</style>
