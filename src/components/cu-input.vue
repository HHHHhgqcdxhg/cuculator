<template>
    <!--<div>-->
        <el-tooltip :disabled="!data.introduce" class="item" effect="light" :content="data.introduce" placement="top-start">
            <el-form-item :label="data.description">
                <el-row>
                    <el-col :span="18">
                        <cuInputInput :lazy="lazy" v-if="data.type==='input'" v-model="data"></cuInputInput>
                        <cuInputChoice v-else-if="data.type==='choice'" v-model="data"></cuInputChoice>
                        <cuInputReduce :lazy="lazy" v-else-if="data.type==='reduce'" v-model="data"></cuInputReduce>
                        <cuSwitchButtons v-else-if="data.type==='buttons'" v-model="data"></cuSwitchButtons>
                        <cuSwitchSwitch v-else-if="data.type==='switch'" v-model="data"></cuSwitchSwitch>
                        <template v-else-if="data.type==='static'">{{data.value}}</template>
                    </el-col>
                    <el-col :span="6" v-if="data.type !=='reduce'">{{data.format && data.format.split("{}")[1]}}
                    </el-col>
                </el-row>
            </el-form-item>
        </el-tooltip>
        <!--<pre>{{data.value}}</pre>-->
    <!--</div>-->
</template>

<script>
    import cuInputInput from "./cu-input-input.vue"
    import cuInputChoice from "./cu-input-choice.vue"
    import cuInputReduce from "./cu-input-reduce.vue"
    import cuSwitchSwitch from './cu-switch-switch.vue'
    import cuSwitchButtons from './cu-switch-buttons.vue'
    export default {
        name: "cu-input",
        model: {
            "prop": "data",
            "event": "change"
        },
        props: ["data","lazy"],
        components: {cuInputInput, cuInputChoice, cuInputReduce,cuSwitchSwitch,cuSwitchButtons}
    }
</script>

<style scoped>

</style>
