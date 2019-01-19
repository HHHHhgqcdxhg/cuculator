<template>
    <div>
        <el-input v-if="!lazy" type="number" v-model.number="data.value" :placeholder="data.placeholder"></el-input>
        <el-input v-else v-model="data.value" :placeholder="data.placeholder"></el-input>
        <!--<el-input v-model="data.value" :placeholder="data.placeholder"></el-input>-->
        <el-alert :title="alertTitle" type="error" v-if="alertTitle" :closable="false"></el-alert>
    </div>
</template>

<script>
    export default {
        name: 'cu-input-input',
        model: {
            prop: 'data',
            event: 'change'
        },
        props: ['data','lazy'],
        data () {
            return {
                alertTitle: null
            };
        },
        watch: {
            // 'data.value': function (newData, oldData) {
            //     if(this.lazy){return}
            //     console.log(newData)
            //     let newNum = parseFloat(newData)
            //     if (newNum.toString() === 'NaN' && newData !== "") {
            //         let oldNum = parseFloat(oldData)
            //         if (oldNum.toString() !== 'NaN') {
            //             this.data.value = oldData;
            //         }
            //         else if (this.data.default !== null) {
            //             this.data.value = this.data.default;
            //         }
            //         this.alertTitle = '请输入数字';
            //     }else if(newData === ''){
            //         if(this.data.default===null){
            //             this.data.value = this.data.default
            //         }else{
            //             this.data.value = 0
            //         }
            //     }
            //     else if (this.data.max !== null && newNum >= this.data.max) {
            //         this.data.value = this.data.max
            //         this.alertTitle = `超出最大值${this.data.max}`
            //     } else if (this.data.min !== null && newNum <= this.data.min) {
            //         this.data.value = this.data.min
            //         this.alertTitle = `低于最小值${this.data.min}`
            //     } else {
            //         this.alertTitle = null;
            //     }
            // },
            'data.value': function (newData, oldData) {
                if(this.lazy){return}
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
                }
                else if (this.data.max !== null && newNum >= this.data.max) {
                    this.data.value = this.data.max
                    this.alertTitle = `超出最大值${this.data.max}`
                } else if (this.data.min !== null && newNum <= this.data.min) {
                    this.data.value = this.data.min
                    this.alertTitle = `低于最小值${this.data.min}`
                } else {
                    this.alertTitle = null;
                }
            },
            // 'data.value': function (newData, oldData) {
            //     let newNum = parseFloat(newData)
            //     if (newNum.toString() === 'NaN' && newData !== "") {
            //         let oldNum = parseFloat(oldData)
            //         if (oldNum.toString() !== 'NaN') {
            //             this.data.value = oldData;
            //         }
            //         else if (this.data.default !== null) {
            //             this.data.value = this.data.default;
            //         }
            //         this.alertTitle = '请输入数字';
            //     } else if (this.data.max && newNum > this.data.max) {
            //         this.alertTitle = `超出最大值${this.data.max}`
            //     } else if (this.data.min && newNum < this.data.min) {
            //         this.alertTitle = `低于最小值${this.data.min}`
            //     } else {
            //         this.alertTitle = null;
            //     }
            // }
        }
    };
</script>

<style scoped></style>
