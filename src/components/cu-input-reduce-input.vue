<template>
    <div>
        <cuInput v-model="data[i]" :lazy="lazy"></cuInput>
    </div>

</template>

<script>
    export default {
        name: "cu-input-reduce-input",
        model: {
            prop: 'data',
            event: 'change'
        },
        props: ['data','indexData',"i","lazy"],
        data(){
            return{
                reduces:[]
            }
        },
        watch:{
            data:function (newData,oldData) {

            }
        },
        beforeCreate(){
            this.$options.components.cuInput = () => import('./cu-input.vue')
        },
    }
</script>

<style scoped>

</style>
