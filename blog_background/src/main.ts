import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


const app = createApp(App)
app.mount('#app')
app.use(Antd)
