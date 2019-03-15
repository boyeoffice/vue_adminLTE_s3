import VueRouter from 'vue-router'
import Vue from 'vue'
import { customRoutes } from '@/lib/router'
import { store } from '@/vuex'


Vue.use(VueRouter)

function requireAuth(to, from, next) {
    if (store.state.auth.authentication) {
      return next()
    } else {
      return next('/login')
    }
  }
  
  function requireVisitors(to, from, next) {
    if (!store.state.auth.authentication) {
      return next()
    } else {
      return next('/')
    }
  }
  

const routes = [
{
    path: '/',
    component: Dashboard,
    meta: {auth: true},
    beforeEnter: requireAuth,
    name: 'Dashboard'
},
{
    path: '/login',
    component: Login,
    meta: {auth: false},
    beforeEnter: requireVisitors
},
{
    path: '/register',
    component: Register,
    meta: {auth: false},
    beforeEnter: requireVisitors
},
{
    path: '/products',
    component: Products,
    meta: {auth: true},
    name: 'Products',
    beforeEnter: requireAuth
},
{
    path: '/product/create',
    component: CreateProduct,
    meta: {auth: true},
    name: 'CreateProduct',
    beforeEnter: requireAuth
},
{
    path: '/product/:slug/edit',
    component: EditProduct,
    meta: {auth: true},
    beforeEnter: requireAuth
},
{
    path: '/profile',
    component: Profile,
    meta: {auth: true},
    beforeEnter: requireAuth,
    name: 'Profile'
},
{
    path: '/webhook',
    component: Sites,
    meta: {auth: true},
    beforeEnter: requireAuth,
    name: 'Webhook'
},
{
    path: '/webhook/create',
    component: CreateSite,
    meta: {auth: true},
    beforeEnter: requireAuth,
    name: 'CreateSite'
},
{
  path: '/webhook/:id',
  component: ShowSite,
  meta: {auth: true},
  beforeEnter: requireAuth
},
{
  path: '/webhook/:id/edit',
  component: EditSite,
  meta: {auth: true},
  beforeEnter: requireAuth
}
]

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Auth/login'
import Register from '@/views/Auth/register'
import Products from '@/views/Products'
import CreateProduct from '@/views/Products/create'
import EditProduct from '@/views/Products/edit'
import Profile from '@/views/Profile'
import Sites from '@/views/Webhook'
import CreateSite from '@/views/Webhook/create'
import EditSite from '@/views/Webhook/edit'
import ShowSite from '@/views/Webhook/show'

export const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    //base: config.ENV.controlPanelBase,
    routes
  })
