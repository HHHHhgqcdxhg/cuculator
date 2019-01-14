<template>
    <div>
        <el-select
            v-model="data.value"
            filterable
            :allow-create="data.choice.config.allowCreate"
            default-first-option
            placeholder="请选择文章标签">
            <el-option
                v-for="item in data.choice.data"
                :key="item.value"
                :label="item.text"
                :value="item.value">
            </el-option>
        </el-select>
        <el-alert :title="alertTitle" type="error" v-if="alertTitle" :closable="false"></el-alert>
    </div>
</template>

<script>
    export default {
        name: "cu-input-choice",
        model: {
            prop: 'data',
            event: 'change'
        },
        props: ['data'],
        data () {
            return {
                alertTitle: null
            };
        },
        watch: {
            'data.value': function (newData, oldData) {
                let newNum = parseFloat(newData)
                if (newNum.toString() === 'NaN') {
                    let oldNum = parseFloat(oldData)
                    if (oldNum.toString() !== 'NaN') {
                        this.data.value = oldData;
                    }
                    else if (this.data.default !== null) {
                        this.data.value = this.data.default;
                    }
                    this.alertTitle = '请输入数字';
                } else if (this.data.max && newNum > this.data.max) {
                    this.alertTitle = `超出最大值${this.data.max}`
                } else if (this.data.min && newNum < this.data.min) {
                    this.alertTitle = `低于最小值${this.data.min}`
                } else {
                    this.alertTitle = null;
                }
            }
        }

    }
</script>

<style scoped>

</style>
