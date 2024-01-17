import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import Vue3TouchEvents from 'vue3-touch-events'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()


app.use(Vue3TouchEvents, {
  swipeTolerance: 75,
})

app.use(pinia)

app.mount('#app')
