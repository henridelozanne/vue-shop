import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
import 'popper.js'
import 'bootstrap'
import './assets/app.scss'
import router from './router'

Vue.config.productionTip = false

Vue.component('Navbar', require('./components/Navbar.vue').default)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
