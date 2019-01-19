<template>
    <div id="app">
        <!--<div v-for="x in 10">{{ x }}</div>-->
        <!--<div v-for="formula in formulas">{{ formula }}</div>-->
        <el-button
            onmousedown="indexControlMouseDown(event)"
            ontouchstart="indexControlTouchDown(event)"
            id="indexControlButton"
            type="warning"
            icon="el-icon-menu"
            @click="indexControl()"
            circle
        ></el-button>
        <el-container>
            <el-aside :style="indexFixed ? 'position:fixed;' : ''" width="180px" id="indexAside" v-show="showLeft">
                <el-menu>
                    <el-submenu v-for="(formulaClass, k, i) in formulas" :index="i.toString()" :key="i">
                        <template slot="title">
                            {{ formulaClass.name }}
                        </template>
                        <router-link :key="i.toString() + '_' + i2.toString()" v-for="(formula, i2) in formulaClass.formulas" :to="'/formula/' + formula.formula_id.toString()">
                            <el-menu-item :index="i.toString() + '_' + i2.toString()"> {{ formula.formula_describe }} </el-menu-item>
                        </router-link>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main style="padding: 0"> <router-view /> </el-main>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';

window.indexButtonLeft = parseInt(window.localStorage.getItem('indexButtonLeft')) || 0;
window.indexButtonTop = parseInt(window.localStorage.getItem('indexButtonTop')) || 0;
window.indexControlMouseMove = e => {
    window.indexButtonMouseMoved = true;
    let afterLeft = window.indexButtonLeft + e.clientX - window.indexButtonStart[0];
    let afterTop = window.indexButtonTop + e.clientY - window.indexButtonStart[1];
    afterLeft < 0 && (afterLeft = 0);
    afterTop < 0 && (afterTop = 0);
    afterLeft > (window.innerWidth - 40) && (afterLeft = window.innerWidth - 40);
    afterTop > (window.innerHeight - 40) && (afterTop = window.innerHeight - 40);
    // window.indexButtonLeft = afterLeft;
    // window.indexButtonTop = afterTop;
    // console.log(window.indexButtonLeft,window.indexButtonTop)
    // console.dir(window.indexControlButtonEl)
    window.indexControlButtonEl.style.left = afterLeft.toString() + 'px'
    window.indexControlButtonEl.style.top = afterTop.toString()+ 'px'
    window.onmouseup=(e)=>{
        window.indexButtonLeft = afterLeft;
        window.indexButtonTop = afterTop;
        window.localStorage.setItem('indexButtonLeft',afterLeft.toString())
        window.localStorage.setItem('indexButtonTop',afterTop.toString())
        window.onmousemove=null
    }
};
window.indexControlMouseDown = e => {
    window.indexButtonMouseMoved = false;
    window.indexButtonStart = [e.clientX, e.clientY];
    window.onmousemove=window.indexControlMouseMove
};
window.indexControlTouchMove=e=>{
    e.preventDefault()
    // console.log(e)
    window.indexButtonMouseMoved = true;
    let afterLeft = window.indexButtonLeft + e.touches[0].clientX - window.indexButtonStart[0];
    let afterTop = window.indexButtonTop + e.touches[0].clientY - window.indexButtonStart[1];
    afterLeft < 0 && (afterLeft = 0);
    afterLeft > (window.innerWidth - 40) && (afterLeft = window.innerWidth - 40);
    afterTop > (window.innerHeight - 40) && (afterTop = window.innerHeight - 40);
    afterTop < 0 && (afterTop = 0);
    // window.indexButtonLeft = afterLeft;
    // window.indexButtonTop = afterTop;
    // console.log(window.indexButtonLeft,window.indexButtonTop)
    // console.dir(window.indexControlButtonEl)
    window.indexControlButtonEl.style.left = afterLeft.toString() + 'px'
    window.indexControlButtonEl.style.top = afterTop.toString()+ 'px'
    window.ontouchend=(e)=>{
        window.indexButtonLeft = afterLeft;
        window.indexButtonTop = afterTop;
        window.removeEventListener('touchmove', window.indexControlTouchMove, { passive: false })
    }
}
window.indexControlTouchDown = e => {
    try{if(e.touches.length > 1){return}}catch (e) {}
    // console.log(e)
    window.indexButtonMouseMoved = false;
    window.indexButtonStart = [e.touches[0].clientX, e.touches[0].clientY];
    window.addEventListener('touchmove', window.indexControlTouchMove, { passive: false })
    // window.ontouchmove=window.indexControlTouchMove
};

export default {
    name: 'App',
    data() {
        return {
            formulas: {},
            showLeft: !(document.body.clientWidth < 655),
            indexFixed: document.body.clientWidth < 655,
        };
    },
    methods: {
        indexControl() {
            // console.log(window.indexButtonMouseMoved)
            if(window.indexButtonMouseMoved){return}
            this.showLeft = !this.showLeft;
        },
        indexControlMouseDown() {
            // console.log(`mousedown`);
        },
    },
    created() {
        window.APP = this;
        if (window.screen.width < window.screen.height && window.screen.width < 655) {
            this.$notify({
                title: '手机端建议横屏使用哦',
                message: '',
                type: 'warning',
                duration: 0,
            });
        }

        axios
            .get('https://cuculator.top/index.json')
            .then(res => {
                let formulas = res.data;
                window.localStorage.formulas_raw = JSON.stringify(formulas);
                window.global_formulas = {};
                for (let formula of formulas) {
                    window.global_formulas[formula.formula_id.toString()] = formula;
                    // console.log(formula);
                    if (Object.keys(this.formulas).indexOf(formula.formula_class.toString()) == -1) {
                        this.$set(this.formulas, formula.formula_class.toString(), {
                            id: formula.formula_class,
                            name: formula.formula_classname,
                            formulas: [],
                        });
                        // this.formulas[formula.formula_class.toString()] = {
                        //     id: formula.formula_class,
                        //     name: formula.formula_classname,
                        //     formulas: [],
                        // };
                    }
                    this.formulas[formula.formula_class.toString()].formulas.push(formula);
                }
                window.localStorage.formulas = JSON.stringify(this.formulas);
                // console.log(this.formulas);
            })
            .catch(error => {
                this.formulas = window.localStorage.formulas;
            });
    },
    mounted(){
        window.indexControlButtonEl=document.getElementById('indexControlButton');
        window.indexControlButtonEl.style.left = window.indexButtonLeft.toString() + 'px'
        window.indexControlButtonEl.style.top = window.indexButtonTop.toString()+ 'px'
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

a {
    text-decoration: none !important;
}

.el-collapse-item__content {
    padding-bottom: 0 !important;
}

.el-radio.is-bordered {
    width: 140px;
}

#indexControlButton {
    position: fixed;
    opacity: 0.8;
    z-index: 65535;
}

#indexAside {
    /*position: fixed;*/
    background-color: #fff;
    box-shadow: 5px 0 6px -5px #6be3ff;
    height: 100vh;
    width: 180px;
    z-index: 1800;
}
</style>
