import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        // 默认显示登录页
        {
            path: '/search',
            name: 'search',
            component: () => import(/* webpackChunkName: "search" */ '@/views/search/index.vue')
        },
        // 搜索结果页
        {
            path: '/search-result/:q',
            name: 'search-result',
            // 开启路由传参
            props: true,
            component: () => import(/* webpackChunkName: "search-result" */ '@/views/search-result/index.vue')
        },
        {
            path: '/article/:id',
            name: 'article',
            // 开启路由传参
            props: true,
            component: () => import(/* webpackChunkName: "article" */ '@/views/article/index.vue')
        },
        // 搜索页
        {
            path: '/',
            redirect: '/login'
        },
        // 登录页
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
        },
        // tabber外部框
        {
            path: '/layout',
            name: 'layout',
            component: () => import(/* webpackChunkName: "layout" */ '@/views/layout-tabbar/index.vue'),
            redirect: '/home',
            children: [
                // 首页
                {
                    path: '/home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
                }
            ]
        }
    ]
});
