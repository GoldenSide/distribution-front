import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/index.scss";
import "@/assets/css/icon.css";
import 'vite-plugin-svg-icons/register';
import 'amfe-flexible/index.js'
import store from "./store";
import { createRouterGuards } from "./router/routerGuards"
import { installDirective } from "./directive"
createRouterGuards(router)

import svgIcon from '@/components/svgicon.vue' // 全局svg图标组件
let app = createApp(App);
installDirective(app)
app.use(store).use(ElementPlus, { size: "small", zIndex: 3000 }).component('svg-icon', svgIcon).use(router)
    .mount("#app");

