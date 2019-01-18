<template>
    <el-radio-group v-model="data.value">
        <div v-for="o,i in data.data" :key="i">
            <el-radio border :label="o.value">{{o.text}}</el-radio>
        </div>
    </el-radio-group>
</template>

<script>
    export default {
        name: "cu-switch-buttons",
        model: {
            prop: 'data',
            event: 'change'
        },
        props: ['data']
    }
</script>

<style scoped>

</style>
