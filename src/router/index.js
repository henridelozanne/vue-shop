import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Overview from '../views/Overview.vue'
import Products from '../views/Products.vue'
import Profile from '../views/Profile.vue'
import Orders from '../views/Orders.vue'
import {fb} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Overview
      },
      {
        path: 'products',
        name: 'products',
        component: Products
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile
      },
      {
        path: 'orders',
        name: 'orders',
        component: Orders
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import(/* webpackChunkName: "checkout" */ '../views/Checkout.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    // vérifier qu'il s'agit de l'admin pour accéder à /admin
    next()
  } else next()
})

export default router
