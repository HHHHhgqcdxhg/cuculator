<template>
    <cuculator v-if="data" :data="data"></cuculator>
</template>

<script>
    import PATH from '../js/path'
    import axios from "axios"
    import cuculator from "../components/cuculator.vue"

    export default {
        name: "formula",
        data: function () {
            return {
                PATH,
                data: null
            }
        },
        watch: {
            '$route' (to, from) {
                this.getData()
                // axios.get(`https://cuculator.top/formula/${to.params.fid}.json`).then((res)=>{
                //     this.data = res.data
                // })
            }
        },
        created () {
            this.getData()
            // axios.get(`https://cuculator.top/formula/${this.$route.params.fid}.json`).then((res)=>{
            //     this.data = res.data
            // })

            // console.log(JSON.stringify(this.data))
            // axios.get("http://127.0.0.1:8000/s/formula/azurlanepaojidamage.json").then((res)=>{
            //     console.log(res.data)
            //     this.data = res.data
            // });
        },
        methods: {
            getData: function () {
                let d_local = window.localStorage.getItem(`formula_${this.$route.params.fid}`)
                if (d_local) {
                    d_local = JSON.parse(d_local)
                    this.data = d_local
                    if (window.global_formulas) {
                        if (d_local.option.time == window.global_formulas[this.$route.params.fid.toString()].formula_time) {
                            return null
                        }
                    }
                }
                this.getDataPromot()
                return null
            },
            getDataPromot: function () {
                axios.get(`https://cuculator.top/formula/${this.$route.params.fid}.json`).then((res) => {
                    this.data = res.data
                    window.localStorage.setItem(`formula_${this.$route.params.fid}`, JSON.stringify(res.data))
                })
            }
        },
        components: {
            cuculator
        }
    }
</script>

<style scoped>

</style>
