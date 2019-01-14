<template>
    <el-container>
        <el-header style="font-family:Microsoft YaHei,微软雅黑,Arial,sans-serif;box-shadow: 0px 5px 6px -5px #a9ff8e;">
            <h2>{{ data.option.description }}</h2>
        </el-header>
        <el-main style="padding:0;">
            <el-container>
                <el-main style="padding:15px;">
                    <el-form label-position="left" label-width="80px">
                        <cuInput v-for="(o, k) in data.inputs" :key="k" :lazy="data.option.lazy"
                                 v-model="data.inputs[k]"></cuInput>
                    </el-form>
                </el-main>
                <el-aside width="20vw" style="max-width:262px;box-shadow: -6px 0 6px -5px #409eff;padding-left: 10px;min-width: 240px">
                    <el-form label-position="left" label-width="80px">
                        <el-collapse value="outputs">
                            <el-collapse-item title="输出" name="outputs">
                                <el-form-item>
                                    <el-button v-show="data.option.lazy" round type="primary" @click="calculate">计算
                                    </el-button>
                                </el-form-item>
                                <el-tooltip v-for="(r, i) in data.outputs" :key="i" :disabled="!r.introduce"
                                            class="item" effect="light" :content="r.introduce" placement="top-start">
                                    <el-form-item :label="r.description"> {{ r.value }}</el-form-item>
                                </el-tooltip>
                            </el-collapse-item>
                            <el-collapse-item title="选项">
                                <el-form-item label="触发计算:">
                                    <el-switch v-model="data.option.lazy" inactive-color="#13ce66" active-text="按钮触发"
                                               inactive-text="输入触发"></el-switch>
                                </el-form-item>
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

    export default {
        name: 'cuculator',
        props: ['data'],
        data () {
            return {};
        },

        created () {
            this.$watch(
                'data',
                (newData, oldData) => {
                    if (newData.option.lazy) {
                        return;
                    }
                    window.localStorage.setItem(newData.option.name, JSON.stringify(newData));
                    try {
                        this.calculate();
                    } catch (e) {}
                },
                {deep: true}
            );
        },
        methods: {
            calculate: function () {
                for (let o of this.data.inputs) {
                    eval(`window.${o.name} = ${o.value}`);
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
                    o.value = result;
                }
            }
        },
        components: {cuInput}
    };
</script>

<style scoped></style>
