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
                axios.get(`https://cuculator.top/formula/${to.params.fid}.json`).then((res)=>{
                    this.data = res.data
                })
            }
        },
        created () {
            axios.get(`https://cuculator.top/formula/${this.$route.params.fid}.json`).then((res)=>{
                this.data = res.data
            })

            // console.log(JSON.stringify(this.data))
            // axios.get("http://127.0.0.1:8000/s/formula/azurlanepaojidamage.json").then((res)=>{
            //     console.log(res.data)
            //     this.data = res.data
            // });
        },
        components: {
            cuculator
        }
    }
</script>

<style scoped>

</style>
