import { createApp } from 'vue'
import router from '@/router/router'
import App from './App.vue'
import store from './store/script'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
