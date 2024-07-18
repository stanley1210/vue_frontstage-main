import { createRouter, createWebHistory } from 'vue-router'
import routerPages from '@/views/pages/router-pages.js'
import Home from '@/Home.vue'


const routes = [
    { name: "home", path: "/", component: Home },
    ...routerPages,
];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

export default router