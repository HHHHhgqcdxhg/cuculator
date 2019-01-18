<template>
    <el-switch inactive-color="#13ce66" :active-text="data.data[0].text" :inactive-text="data.data[1].text"
               :active-value="data.data[0].value" :inactive-value="data.data[1].value" v-model="data.value"></el-switch>
</template>

<script>
    export default {
        name: "cu-switch-switch",
        model: {
            prop: 'data',
            event: 'change'
        },
        props: ['data']
    }
</script>

<style scoped>

</style>
