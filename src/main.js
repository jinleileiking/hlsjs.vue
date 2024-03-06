import { createApp } from 'vue'
import App from './App.jsx'
import Router from './router/index.js'

import PrimeVue from 'primevue/config'
// theme
import 'primevue/resources/themes/saga-blue/theme.css'
// core css
import 'primevue/resources/primevue.min.css'
// icon css
import 'primeicons/primeicons.css'
// flex
import 'primeflex/primeflex.css'

let app = createApp(App)
app.use(Router)
app.use(PrimeVue, { ripple: true })
app.mount('#app')
