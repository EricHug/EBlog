import Vue from 'vue'
import store from '../store/index'
import Router from 'vue-router'
import Error404 from '@/views/error/Error404'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

// const _import = require('./_import_' + process.env.NODE_ENV)
const _import = require('./_import_' + process.env.NODE_ENV)

export const constantRouterMap = [
    {
        path: '/blog',
        redirect: '/blog/main',
        component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-edit-outline',
            title: '博客列表'
        },
        children: [
            {
                path: 'main',
                component: _import('blog/Main'),
                meta: { title: '最新动态' }
            },
            {
                path: 'detail/:id',
                component: _import('blog/Detail'),
                meta: { title: '最新动态' }
            },
        ]
    },
    {
        path: "/404",
        component: Error404
    },
    {
        path: '/',
        redirect: '/blog',
    },
    {
        path: "*",
        redirect: "/404"
    }
]




const router = new Router({
    routes: constantRouterMap,
    scrollBehavior(to, from, savedPosition) {
        if (to.meta.scrollTop) {
            return { x: 0, y: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    Vue.prototype.$setTitle(to.meta.title)
    next()
})



export default router