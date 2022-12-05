import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// nprogress
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import 'animate.css';
import '@/assets/font/font.css'
import '@/assets/font/font.js'
import '@/assets/styles/base.css'
import '@/assets/styles/constant.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 配置nprogress
nprogress.configure({ showSpinner: false, trickleSpeed: 100 })

app.mount('#app')
