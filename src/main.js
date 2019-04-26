import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Honoka, BootstrapVueをimport
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-honoka/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// VueElectron(Vue.jsのElectronラッパー)をimport
import VueElectron from 'vue-electron'
Vue.use(VueElectron)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
