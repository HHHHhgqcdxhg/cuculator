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
                formulas: {}
            };
        },
        created () {
            axios.get('https://cuculator.top/index.json').then(res => {
                let formulas = res.data;
                for (let formula of formulas) {
                    console.log(formula);
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

                console.log(this.formulas);
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
</style>
