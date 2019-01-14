<template>
    <div>
        <cuInputReduceInput :lazy="lazy" v-for="(item,index) in disData" :key="index" v-model="disData"
                            :i="index"></cuInputReduceInput>
        <el-button @click="add">增加一栏</el-button>
        <!--{{disData}}<br><br><br>-->
        <!--{{data}}-->
    </div>
</template>

<script>
    import cuInputReduceInput from "./cu-input-reduce-input.vue"
    export default {
        name: "cu-input-reduce",
        model: {
            prop: 'data',
            event: 'change'
        },
        props: ['data','lazy'],
        data () {
            return {
                disData: []
            }
        },
        created () {
            let d = this.data.reduce
            for (let [i, v] of this.data.reduce.value.entries()) {
                let o = {
                    index: i,
                    type: d.type,
                    accuracy: d.accuracy,
                    max: d.max,
                    min: d.min,
                    format: d.format,
                    value: v,
                    name: "",
                    description:d.description,
                    placeholder:d.placeholder,
                }
                this.disData.push(o)
            }
            this.$watch("disData", (newData, oldData) => {
                for (let o of newData) {
                    this.data.reduce.value[o.index] = o.value
                }
                this.data.value = this.data.reduce.value.reduce((a, b) => { return eval(this.data.reduce.formula) })
            }, {
                deep: true
            })
        },
        watch: {
            // "disData":function (newData,oldData) {
            //     console.log(456)
            //     for (let o of newData){
            //         console.log(this.data.reduce.value[o.index])
            //         this.data.reduce.value[o.index] = o.value
            //     }
            // }
        },
        methods: {
            add: function () {
                let d = this.data.reduce
                let o = {
                    index: this.disData[this.disData.length - 1].index + 1,
                    type: d.type,
                    accuracy: d.accuracy,
                    max: d.max,
                    min: d.min,
                    format: d.format,
                    value: d.default,
                    name: "",
                    description:d.description,
                    placeholder:d.placeholder,
                }
                this.disData.push(o)
            }
        },
        components: {cuInputReduceInput}
    }
</script>

<style scoped>

</style>
