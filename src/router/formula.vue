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
            // this.$notify({
            //     title: '本公式已更新',
            //     message: `version :${123} -> ${234}`,
            //     type: 'success',
            //     duration:0
            // });
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
                let hasLocal = false
                let d_local = window.localStorage.getItem(`formula_${this.$route.params.fid}`)
                if (d_local) {
                    hasLocal = true
                    d_local = JSON.parse(d_local)
                    this.data = d_local
                    if (window.global_formulas) {
                        if (d_local.option.time == window.global_formulas[this.$route.params.fid.toString()].formula_time) {
                            return null
                        }
                    }
                }
                this.getDataPromot(hasLocal)
                return null
            },
            getDataPromot: function (hasLocal) {
                axios.get(`https://cuculator.top/formula/${this.$route.params.fid}.json`).then((res) => {
                    if(hasLocal){
                        let oldTime = this.data.option.time
                        let newTime = res.data.option.time
                        if(newTime !== oldTime){
                            this.data = res.data
                            window.localStorage.setItem(`formula_${this.$route.params.fid}`, JSON.stringify(res.data))
                            if(hasLocal){
                                this.$notify({
                                    title: '本公式已更新',
                                    message: `version :${oldTime} -> ${newTime}`,
                                    type: 'success'
                                });
                            }
                        }
                    }else{
                        this.data = res.data
                        window.localStorage.setItem(`formula_${this.$route.params.fid}`, JSON.stringify(res.data))
                    }




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
