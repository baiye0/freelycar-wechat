import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/user/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ],
  mode: 'history',
})
