import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

import zConfig from '@/uni_modules/z-paging/components/z-paging/js/z-paging-config'
zConfig.setConfig({
  'default-page-size': '20',
  'empty-view-text': '空空如也~',
  'safe-area-inset-bottom': true
})
