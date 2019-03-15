//import '@/lib/css.js'
//import '@/lib/script.js'
import Vue from 'vue'
import App from '@/App'
import { router } from '@/router'
import { store } from '@/vuex'
window.axios = require('axios')
import Storage from '@/storage'

axios.defaults.baseURL = 'http://boyeoffice.test'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + Storage.getToken()


Vue.use(require('vue-moment'))
require('@/config/bootstrap')

Vue.config.productionTip = false


//Vue.component('select2', require('@/components/Select2'))


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App },
  store
})
