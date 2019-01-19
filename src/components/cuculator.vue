<template>
    <el-container>
        <el-header style="font-family:Microsoft YaHei,微软雅黑,Arial,sans-serif;box-shadow: 0px 5px 6px -5px #a9ff8e;">
            <el-row>
                <el-col :span="23" :xs="22">
                    <h2>{{ data.option.description }}</h2>
                </el-col>
                <el-col :span="1" :xs="2">
                    <el-button @click="outputControl()" type="primary" id="outputControlButton" circle icon="el-icon-view"></el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-main style="padding:0;">
            <el-container>
                <el-main style="padding-top:10px;">
                    <!--{{data}}-->
                    <el-form label-position="right" label-width="80px">
                        <el-row :gutter="20">
                            <el-col v-for="(o, k) in data.inputs" :key="k" :xs="24" :sm="12" :md="8" :lg="6" :xl="3">
                                <cuInput :lazy="data.option.lazy" v-model="data.inputs[k]"></cuInput>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-main>
                <el-aside id="outputAside" width="20vw" v-show="showOutput">
                    <el-form label-position="left" label-width="86px">
                        <el-collapse value="outputs">
                            <el-collapse-item title="状态" name="switches">
                                <cuInput v-for="(o, i) in data.switches" :key="i" v-model="data.switches[i]"></cuInput>
                                <!--<cu-switch v-for="o,i in data.switches" :key="i" :lazy="data.option.lazy" v-model="data.switches[i]"></cu-switch>-->
                                <template v-if="!data.switches"
                                >无
                                </template>
                            </el-collapse-item>
                            <el-collapse-item title="输出" name="outputs">
                                <el-form-item>
                                    <el-button v-show="data.option.lazy" round type="primary" @click="calculate">计算
                                    </el-button>
                                </el-form-item>
                                <el-row :gutter="20">
                                    <el-col>
                                        <el-tooltip v-for="(r, i) in data.outputs" :key="i" :disabled="!r.introduce"
                                                    class="item" effect="light" :content="r.introduce"
                                                    placement="top-start">
                                            <el-form-item :label="r.description"> {{ r.value }}</el-form-item>
                                        </el-tooltip>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                            <el-collapse-item title="选项">
                                <el-tooltip class="item" effect="light" content="触发计算的方式,输入触发or按钮触发"
                                            placement="top-start">
                                    <el-form-item label="触发计算:">
                                        <el-switch v-model="data.option.lazy" inactive-color="#13ce66" active-text="按钮"
                                                   inactive-text="输入"></el-switch>
                                    </el-form-item>
                                </el-tooltip>
                                <el-tooltip class="item" effect="light" content="使用逗号分割结果以增加可读性"
                                            placement="bottom-start">
                                    <el-form-item label="格式化结果:">
                                        <!--<el-switch v-model="data.option.split" :active-value="true" :inactive-value="false"></el-switch>-->
                                        <el-radio-group v-model="data.option.split" size="mini" @change="calculate()">
                                            <el-radio-button :label="false">否</el-radio-button>
                                            <el-radio-button :label="null">默认</el-radio-button>
                                            <el-radio-button :label="true">是</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                </el-tooltip>
                            </el-collapse-item>
                        </el-collapse>
                    </el-form>
                </el-aside>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
    import cuInput from './cu-input.vue';
    import cuSwitch from './cu-switch.vue';

    export default {
        name: 'cuculator',
        props: ['data'],
        data () {
            return {
                showOutput: !(document.body.clientWidth < 500)
            };
        },

        created () {
            this.$watch(
                'data',
                (newData, oldData) => {
                    // console.log(newData.option.split)
                    // console.log(oldData.option.split)
                    // if(newData.option.split!==oldData.option.split){
                    //     console.log(newData.option.split)
                    //     this.calculate();
                    // }
                    if (newData.option.lazy) {
                        return;
                    }
                    // console.log(`formula_${newData.option.id.toString()}`)
                    // console.log(newData)
                    window.localStorage.setItem(`formula_${newData.option.id.toString()}`, JSON.stringify(newData));
                    try {
                        this.calculate();
                    } catch (e) {}
                },
                {deep: true}
            );
            this.calculate();
        },
        mouted () {
            // this.calculate()
        },
        methods: {
            outputControl(){this.showOutput = !this.showOutput},
            calculate: function () {
                if (this.data.inputs) {
                    for (let o of this.data.inputs) {
                        eval(`window.${o.name} = ${o.value}`);
                    }
                }
                if (this.data.switches) {
                    for (let o of this.data.switches) {
                        eval(`window.${o.name} = ${o.value}`);
                    }
                }
                for (let o of this.data.outputs) {
                    let accuracy = Math.pow(10, o.accuracy);

                    let result = eval(o.formula);
                    eval(`window.${o.name} = result`);
                    result = result * accuracy;
                    if (o.fix === 'round') {
                        result = Math.round(result);
                    } else if (o.fix === 'ceil') {
                        result = Math.ceil(result);
                    } else if (o.fix === 'floor') {
                        result = Math.floor(result);
                    }
                    result = result / accuracy;
                    o.max != null && result > o.max && (result = o.max);
                    o.min != null && result < o.min && (result = o.min);
                    result = this.vSplit(o, result);
                    o.value = result;
                }
            },
            split: function (a) {
                a = a.toString();
                let as = a.split('.');
                a = as[0];
                let l = a.length;
                let i = a.length - 1;
                let res = '';
                for (i; i >= 0; i--) {
                    res = a[i] + res;
                    (l - i) % 3 === 0 && i > 0 && (res = ',' + res);
                }
                as.length > 1 && (res += '.' + as[1]);
                return res;
            },
            vSplit: function (o, result) {
                if (this.data.option.split === null) {
                    o.split && (result = this.split(result));
                } else {
                    if (this.data.option.split === true) {
                        result = this.split(result);
                    }
                }
                return result;
            }
        },
        components: {cuInput, cuSwitch}
    };
</script>

<style>
    #outputControlButton {
        margin-top: 0.83em;
    }

    #outputAside {
        box-shadow: -6px 0 6px -5px #409eff;
        padding-left: 10px;
        min-width: 238px;
        height: 100vh;
        z-index: 1800;
        background-color: #fff;
    }
</style>
