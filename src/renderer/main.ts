import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as EAPI from './electron'
import App from './App.vue'
import router from './router'
// 
import '@/assets/styles/main.scss'

window.eapi = EAPI

const app = createApp(App)

app.use(createPinia())
app.use(router)


app.mount('#app')
