<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        trueName: '',
        arkSn: '',
        clientId:'',
        staffId:''
      }
    },
    mounted: function () {
      this.arkSn = this.$route.params.arkSn
      localStorage.setItem('arkSn', this.arkSn)
      this.clientId =localStorage.getItem('clientId')
      this.staffId =localStorage.getItem('staffId')
      this.isLogin()

    },
    methods: {
      // 是否登录过
      isLogin() {
        if (localStorage.getItem('jwt')) {

          //如果技师已经登录，直接去接单页
          if (this.staffId !== null && localStorage.getItem('jwt') !== null) {
            //判断扫的柜子是哪个门店，帮ta切换过去/提醒他，没有这个柜子的操作权
            this.getArkInfo()
          }

          //如果用户已经登录，
          if (localStorage.getItem('jwt') !== null && this.clientId !== null) {
            this.trueName = localStorage.getItem('trueName')
            //若用户没有填写真实姓名，则先让其填写真实姓名
            if (this.trueName === '' || this.trueName === null) {
              alert("请完善您的真实姓名")
              this.$router.push({path: '/userInfo'})
            } else {
              //通过扫码进来的要判断门店id与用户默认id是否相同
              this.getUserArkInfo()
            }
          }

        } else {
          this.$router.push({path: '/login'})
        }
      },

      // 判断技师的门店
      getArkInfo(){
        this.$get('/wechat/ark/getArkInfo', {
          arkSn: this.arkSn
        }).then(res => {
          localStorage.setItem('arkName', res.name)
          if (res.storeId === localStorage.getItem('storeId')) {
            // 判断技师是否开通智能柜
            this.$get('/wechat/staff/isCurrentArk', {
              staffId: this.staffId
            }).then(res => {
              if(res){
                console.log('门店没有切换，直接跳转到order路径')
                this.$router.push({path: '/order'})
              }else {
                alert('您没有智能柜服务权限，详情请咨询门店')
                localStorage.clear()
                this.$router.push({path:'/login'})
              }
            })
          } else {
            // 更新门店信息
            this.$post('/wechat/employee/selectStore', {
              id: localStorage.getItem('employeeId'),
              defaultStoreId: res.storeId
            }).then(res => {
              if (res) {
                localStorage.setItem('storeId', res.defaultStoreId)
                localStorage.setItem('storeName', res.defaultStoreName)
                localStorage.setItem('staffId', res.defaultStaffId)
              }
              this.$router.push({path: '/order'})
            })
          }
        })
      },

      // 判断用户的门店
      getUserArkInfo(){
        this.$get('/wechat/ark/getArkInfo', {
          arkSn: this.arkSn
        }).then(res => {
          localStorage.setItem('arkName', res.name)
          if (res.storeId === localStorage.getItem('storeId')) {
            this.getOrderState()
          } else {
            // 更新门店信息
            this.$post('/wechat/wxuser/chooseDefaultStore', {
              id: localStorage.getItem('id'),
              defaultStoreId: res.storeId
            }).then(res => {
              if (res) {
                localStorage.setItem('storeName', res.defaultStoreName)
                localStorage.setItem('storeId', res.defaultStoreId)
                localStorage.setItem('clientId', res.defaultClientId)
              }
              this.getOrderState()
            })
          }
        })
      },

//      判断当前最新订单状态
      getOrderState() {
        this.$get('/wechat/order/listOrders', {
          clientId: this.clientId,
          type: 'ark'
        }).then(res => {
          if (res && res.length > 0) {
            if (res[0].state < 3) {
              this.$router.push({path: "/myOrder"});
            } else {
              this.$router.push({path: '/billingOrder'})
            }
          } else {
            this.$router.push({path: '/billingOrder'})
          }
        })
      }


    },
  };
</script>

