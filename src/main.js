import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './premission'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@/assets/icons'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(store).use(router).mount('#app')
