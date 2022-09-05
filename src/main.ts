import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/styles.scss';
import vuetify from './plugins/vuetify'


// Localization

import { AVAILABLE_LANGUAGES, getLanguage } from "@/services/locale.service"

import GetTextPlugin from 'vue-gettext'
import translations from './translations.json'

Vue.use(GetTextPlugin, {
  availableLanguages: AVAILABLE_LANGUAGES,
  defaultLanguage: getLanguage(),
  translations: translations,
  silent: true,
})

// GTM

import VueGtm from '@gtm-support/vue2-gtm'

Vue.use(VueGtm, {
  id: 'GTM-KCXPVR9', // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
  queryParams: {
    // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
    //gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    //gtm_preview: 'env-4',
    //gtm_cookies_win: 'x',
  },
  defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
  compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
  nonce: '2726e7f26c', // Will add `nonce` to the script tag
  enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
  debug: true, // Whether or not display console logs debugs (optional)
  loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
  vueRouter: router, // Pass the router instance to automatically sync with router (optional)
  ignoredViews: [], // Don't trigger events for specified router names (optional)
  trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
})

// Sentry

import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

if (process.env.VUE_APP_SENTRY_DSN) {
  Sentry.init({
    Vue,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ["localhost",
          (process.env.VUE_APP_BASE_URL_CABINET || "app.advy.ai"),
          (process.env.VUE_APP_BASE_URL_LANDING || "advy.ai"), /^\//],
      }),
    ],
    environment: (process.env.VUE_APP_SENTRY_ENV || 1.0),
    tracesSampleRate: (process.env.VUE_APP_SENTRY_TRACES_SAMPLE_RATE || 1.0),
  })
}

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
