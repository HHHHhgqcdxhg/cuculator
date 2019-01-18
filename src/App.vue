<template>
    <div id="app">
        <!--<div v-for="x in 10">{{ x }}</div>-->
        <!--<div v-for="formula in formulas">{{ formula }}</div>-->
        <el-container>
            <el-aside width="20vw" style="box-shadow: 5px 0 6px -5px #6be3ff;max-width: 230px;">
                <el-menu>
                    <el-submenu v-for="(formulaClass, k, i) in formulas" :index="i.toString()" :key="i">
                        <template slot="title">
                            {{formulaClass.name}}
                        </template>
                        <router-link :key="i.toString() + '_' + i2.toString()" v-for="(formula,i2) in formulaClass.formulas" :to="'/formula/' + formula.formula_id.toString()">
                            <el-menu-item
                                :index="i.toString() + '_' + i2.toString()">
                                {{formula.formula_describe}}
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="padding: 0">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'App',
        data () {
            return {
                formulas: {},
            };
        },
        methods:{

        },
        created () {
            axios.get('https://cuculator.top/index.json').then(res => {
                let formulas = res.data;
                window.localStorage.formulas_raw = JSON.stringify(formulas)
                window.global_formulas = {}
                for (let formula of formulas) {
                    window.global_formulas[formula.formula_id.toString()] = formula
                    // console.log(formula);
                    if (Object.keys(this.formulas).indexOf(formula.formula_class.toString()) == -1) {
                        this.$set(this.formulas, formula.formula_class.toString(), {
                            id: formula.formula_class,
                            name: formula.formula_classname,
                            formulas: []
                        })
                        // this.formulas[formula.formula_class.toString()] = {
                        //     id: formula.formula_class,
                        //     name: formula.formula_classname,
                        //     formulas: [],
                        // };
                    }
                    this.formulas[formula.formula_class.toString()].formulas.push(formula);
                }
                window.localStorage.formulas = JSON.stringify(this.formulas)
                // console.log(this.formulas);
            }).catch(error=>{
                this.formulas = window.localStorage.formulas
            });
        }
    };
</script>

<style>
    html,
    body,
    #app {
        margin: 0 !important;
        padding: 0 !important;
    }
    a{
        text-decoration:none !important;
    }
    .el-collapse-item__content{
        padding-bottom: 0 !important;
    }
    .el-radio.is-bordered{
        width:140px;
    }

</style>
