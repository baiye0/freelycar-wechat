// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {get, post, getExcel, postExcel} from "./components/axiosHttp";
import Cube from 'cube-ui'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.config.productionTip = false
// 引入cube
Vue.use(Cube)
// 引入mintUI
Vue.use(Mint)
// 引入axios
Vue.prototype.axios = axios
// 引入封装接口
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$getExcel = getExcel
Vue.prototype.$postExcel = postExcel

router.beforeEach((to, from, next) => {
  console.log('to.path:', to.path)
  if (to.path === '/login') {
    next()
    return
  }
  let jwt = localStorage.getItem('jwt')
  // 判断jwt是否存在。是，继续。否，跳转到登录页
  if (jwt) {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
