import { store } from '@/vuex'
import Storage from '@/storage'
window.Nprogress = require('nprogress')
axios.interceptors.request.use(function (config) {
  Nprogress.start()
  return config
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response){
  Nprogress.done()
  return response
}, function (error) {
  console.error(error)
  return Promise.reject(error)
})
$(document).ajaxComplete(function( event, request, settings ) {
  console.log(2)
  Nprogress.done()
})
$(document).ajaxStart(function() {
  Nprogress.start()
})

window.toastr = require('toastr/build/toastr.min.js');
window.innerHeight = 800;

window.toastr.options = {
    positionClass: "toast-bottom-right",
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
}

// Error interceptor can be used for global error handling

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  Nprogress.done()
  if (error.response.status === 401) {
    store.commit('RECIEVE_AUTH', false)
    Storage.remove()
    router.push('/login')
    //toastr.warning('Your session has expired!') 
  } else if (error.response.status === 422) {
    var errors = error.response.data.errors
    toastr.warning(errors.name[0])
    toastr.warning(errors.url[0])
    toastr.warning(errors.type[0])
    Nprogress.done()
  } else if (error.response.status === 403) {
    toastr.warning('You dont have enough permission')
  }
  return Promise.reject(error)
})