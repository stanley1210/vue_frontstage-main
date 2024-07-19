import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'



createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')




