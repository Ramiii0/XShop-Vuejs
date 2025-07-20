import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'

import App from './App.vue'

import { createApp } from 'vue'

import 'unfonts.css'

const app = createApp(App)
const pinia = createPinia()


registerPlugins(app)
app.use(pinia)

app.mount('#app')

