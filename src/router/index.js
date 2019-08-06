import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/user/login.vue'
import userHome from '@/view/user/userHome.vue'
import userInfo from '@/view/user/userInfo.vue'
import carInfo from '@/view/user/carInfo.vue'
import myOrder from '@/view/user/myOrder.vue'
import buyCard from '@/view/user/buyCard.vue'
import chooseStore from '@/view/user/chooseStore.vue'
import payOrder from '@/view/user/payOrder.vue'
import addCar from '@/view/user/addCar.vue'
import billingOrder from '@/view/user/billingOrder.vue'
import orderTracking from '@/view/user/orderTracking.vue'
import store from '@/view/user/store.vue'
import changeUserInfo from '@/view/user/changeUserInfo.vue'


import openDoor from '@/view/components/openDoor.vue'
import success from '@/view/components/success.vue'
import roleSelection from '@/view/components/role-selection.vue'
import chooseBrand from '@/view/components/chooseBrand.vue'


import tecHome from '@/view/technician/tecHome.vue'
import tecLogin from '@/view/technician/tecLogin.vue'
import historyOrder from '@/view/technician/historyOrder.vue'
import order from '@/view/technician/order.vue'
import orderDetail from '@/view/technician/orderDetail.vue'
import locationInfo from '@/view/technician/locationInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{
        title:'登录'
      }
    },{
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/chooseBrand',
      name: 'chooseBrand',
      component: chooseBrand
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },{
      path: '/locationInfo',
      name: 'locationInfo',
      component: locationInfo
    },{
      path: '/role-select/:arkSn',
      name: 'role-select',
      component:roleSelection,
    },{
      path: '/changeUserInfo',
      name: 'changeUserInfo',
      component:changeUserInfo,
    },
    {
      path: '/tecLogin',
      name: 'tecLogin',
      component: tecLogin
    },{
      path: '/addCar',
      name: 'addCar',
      component: addCar
    },{
      path: '/billingOrder',
      name: 'billingOrder',
      component: billingOrder
    },{
      path: '/orderTracking',
      name: 'orderTracking',
      component: orderTracking
    },{
      path: '/store',
      name: 'store',
      component: store
    },
    {
      path: '/historyOrder',
      name: 'historyOrder',
      component: historyOrder
    },
    {
      path: '/payOrder',
      name: 'payOrder',
      component: payOrder
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
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/buyCard',
      name: 'buyCard',
      component: buyCard
    },
    {
      path: '/chooseStore',
      name: 'chooseStore',
      component: chooseStore
    },
    {
      path: '/openDoor',
      name: 'openDoor',
      component: openDoor
    },
    {
      path: '/success',
      name: 'success',
      component: success
    },
    {
      path: '/carInfo',
      name: 'carInfo',
      component: carInfo
    }
  ],
  mode: 'history',
})
