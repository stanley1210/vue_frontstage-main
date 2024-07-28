//0. 引用Vue Router
import { createRouter, createWebHistory } from "vue-router";

//1. 引用元件
import Home from '@/views/pages/Home.vue'
import NotFound from "@/views/NotFound.vue";
import routerPages from '@/views/pages/router-pages.js'
import About from "@/views/pages/About.vue"

// 2. 定義網頁路由
const routes = [
    { name: "home-link", path: "/", component: Home },
    { name: "about", path: "/pages/about", component: About },
    ...routerPages,
    { name: "notfound-link", path: "/:pathMatch(.*)*", component: NotFound }
    // ...routerLogin

]

// 3. 產生路由物件
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// 4. 導出路由物件以利其他元件導入
export default router
