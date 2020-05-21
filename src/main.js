import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
window.$ = window.jQuery = jQuery;
import 'popper.js'
import 'bootstrap'
import './assets/app.scss'
import router from './router'
import {fb} from './firebase'
import VueFirestore from 'vue-firestore'
import VueCarousel from 'vue-carousel'

import store from './store.js'

Vue.use(VueCarousel);

import Vue2Filters from 'vue2-filters'
Vue.use(Vue2Filters)

Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true,
});

Vue.component('Navbar', require('./components/Navbar.vue').default)
Vue.component('AddToCart', require('./components/AddToCart.vue').default)

Vue.use(VueFirestore);

import Swal from 'sweetalert2';
window.Swal = Swal;

Vue.config.productionTip = false

let app = '';

fb.auth().onAuthStateChanged(function() {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')    
  }
})
