import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { registerPlugins } from '@/plugins'

import App from './App.vue'

import 'unfonts.css'

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)
app.use(pinia)

app.mount('#app')
