import { createApp } from 'vue'
import router from './router/index'
import './style.less'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)



const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(store)
app.mount('#app')