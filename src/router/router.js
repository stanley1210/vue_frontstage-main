//0. 引用Vue Router
import { createRouter, createWebHistory } from "vue-router";
import { createRouter, createWebHistory } from 'vue-router'
import routerPages from '@/views/pages/router-pages.js'
import Home from '@/Home.vue'

//1. 引用元件
import Home from '@/views/Home.vue';
import NotFound from "@/views/NotFound.vue";
import routerPages from "@/views/pages/router-pages.js";

// 2. 定義網頁路由
const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound },
    ...routerPages
    // ...routerLogin

]

// 3. 產生路由物件




const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// 4. 導出路由物件以利其他元件導入
export default router
