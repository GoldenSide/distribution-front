import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw, } from "vue-router";

import layout from "@/components/layout/index.vue";

const routes: RouteRecordRaw[] = [
    {

        path: "/",
        name: "__",
        component: layout,
        redirect: '/advertising',
        meta: {
            title: '活动页',
            icon: ''
        },
        children: [
            {
                path: 'advertising',
                name: "advertising",
                meta: {
                    title: '活动页'
                },
                component: () => import("@/views/advertising/index.vue")
            },
            {
                path: "register",
                name: "register",
                meta: {
                    title: '申请成为分销商',
                    icon: ''
                },
                component: () => import("@/views/register/index.vue")
            },
            {
                path: "ownerRules",
                name: "ownerRules",
                meta: {
                    title: '奖励规则',
                    icon: ''
                },
                component: () => import("@/views/ownerRules/rule.vue")
            },
            {
                path: "agreement",
                name: "agreement",
                meta: {
                    title: '分销商辅助协议',
                    icon: ''
                },
                component: () => import("@/views/agreement/index.vue")
            },
            {
                path: "test",
                name: "test",
                meta: {
                    title: '测试',
                    icon: ''
                },
                component: () => import("@/views/test/index.vue")
            }
        ]
    },
    {
        path: "/index",
        name: "index",
        redirect: "/index/customData",
        component: layout,
        meta: {
            title: '',
            icon: ''
        },
        children: [
            {
                path: "customData",
                name: "customData",
                meta: {
                    title: '分销数据',
                    icon: ''
                },
                component: () => import("@/views/customData/index.vue")
            },


        ]
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router