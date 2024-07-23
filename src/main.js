import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import store from './store'; // vuex



const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store) // vuex
app.mount('#app')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
}

