import App from './App'
import LXBottomBtn from './uni_modules/LXBottomBtn.vue'
import HalfBottomBtn from './uni_modules/HalfBottomBtn.vue'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.component('LXBottomBtn', LXBottomBtn)
app.component('HalfBottomBtn', HalfBottomBtn)
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component('LXBottomBtn', LXBottomBtn)
  app.component('HalfBottomBtn', HalfBottomBtn)
  return {
    app
  }
}
// #endif
