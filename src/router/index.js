import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

import formula from "./formula.vue"

export default new Router({
    routes: [
        {
            path: '/formula/:fid',
            component: formula
        }
    ]
});
