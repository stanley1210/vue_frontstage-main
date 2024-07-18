import { createRouter, createWebHistory } from 'vue-router'
import routerPages from '@/views/pages/router-pages.js'


const routes = [
    ...routerPages,
];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

export default router