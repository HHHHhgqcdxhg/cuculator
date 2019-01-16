import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

import formula from "./formula.vue"

export default new Router({
    routes: [
        // {
        //     path: '/formula/:fid/:time',
        //     component: formula
        // },
        {
            path: '/formula/:fid',
            component: formula
        }
    ]
});
