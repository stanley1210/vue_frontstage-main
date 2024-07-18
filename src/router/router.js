import { createRouter, createWebHistory } from 'vue-router'
import routerCar from '@/views/Pages/router-car.js'
import Preference from '../views/Pages/Preference.vue';


const routes = [
    // {
    //     path: '/',
    //     component: Preference, // 根路徑 '/' 顯示 Preference 頁面
    // },
    ...routerCar,
];



const router = createRouter({
    routes: routes,
    history: createWebHistory(),
});

export default router