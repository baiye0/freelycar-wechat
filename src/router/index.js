import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/user/login.vue'
import userHome from '@/view/user/userHome.vue'
import userInfo from '@/view/user/userInfo.vue'
import carInfo from '@/view/user/carInfo.vue'
import myOrder from '@/view/user/myOrder.vue'


import tecHome from '@/view/technician/tecHome.vue'
import tecLogin from '@/view/technician/tecLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/tecLogin',
      name: 'tecLogin',
      component: tecLogin
    },
    {
      path: '/tecHome',
      name: 'tecHome',
      component: tecHome
    },
    {
      path: '/userHome',
      name: 'userHome',
      component: userHome
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },{
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/carInfo',
      name: 'carInfo',
      component: carInfo
    }
  ],
  mode: 'history',
})
