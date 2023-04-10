import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import axios from 'axios'
const api = axios.create({ baseURL: '//localhost:8000/api/' })

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.config.globalProperties.$api = api

app.use(createPinia())
app.use(router)
app.mount('#app')

export { api }
