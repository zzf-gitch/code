import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/fonts/iconfont.css'
import Directives from "@/directive/directives.js"
import RootNav from './components/RootNav.vue'
// import '@/directive/table-sticky.js'
import UILCOUNT from '@/views/countDown/index.js'
const app = createApp(App)
app.use(store)
app.use(ElementPlus)
app.use(router)
app.use(Directives)
app.component('RootNav', RootNav)
app.use(UILCOUNT)
app.mount('#app')
