import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import Vue3TouchEvents from 'vue3-touch-events'

const app = createApp(App)

app.use(Vue3TouchEvents, {
  swipeTolerance: 75,
})

app.mount('#app')
