import { createApp } from 'vue'

import './plugins/PureCSS/stylesheets'
import './plugins/FontAwesome/library'
import pageTracker, { AnalyticsFunction } from './plugins/Gtag'

import './registerServiceWorker'
import router from './router'
import store from './store'

import App from './App.vue'

declare global {
  interface Window { gtag: undefined | AnalyticsFunction }
}

createApp(App)
  .use(store)
  .use(router)
  .use(pageTracker, {
    gtag: window.gtag,
    titlePrefix: 'CookingScribe | ',
  })
  .mount('#app')
