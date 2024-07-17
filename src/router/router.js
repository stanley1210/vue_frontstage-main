import { createRouter, createWebHistory } from 'vue-router'
import routerCar from '@/views/Pages/router-car.js'


const routes = [
    ...routerCar,
];

const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

export default router