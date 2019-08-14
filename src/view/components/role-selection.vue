<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        trueName:'',
        arkSn:''
      }
    },
    mounted:function(){

      this.isLogin()

    },
    methods: {
      // 是否登录过
      isLogin(){
        console.log(this.$route.params.arkSn)
        let arkSn = this.$route.params.arkSn
        let clientid=localStorage.getItem('clientId')
        localStorage.setItem('arkSn', arkSn)


        if (localStorage.getItem('jwt')) {
          //如果技师已经登录，直接去接单页
          if (localStorage.getItem('staffId') !== null && localStorage.getItem('jwt') !== null) {
              //判断扫的柜子是哪个门店，帮ta切换过去/提醒他，没有这个柜子的操作权
              this.$get('/wechat/ark/getArkInfo', {
                  arkSn: arkSn
              }).then(res => {
                  localStorage.setItem('arkName', res.name)
                  if (res.storeId === localStorage.getItem('storeId')) {
                      console.log('门店没有切换，直接跳转到order路径')
                  } else {
                      // 更新门店信息
                      this.$post('/wechat/employee/selectStore', {
                          id:localStorage.getItem('employeeId'),
                          defaultStoreId: res.storeId
                      }).then(res => {
                          if(res){
                              localStorage.setItem('storeId', res.defaultStoreId)
                              localStorage.setItem('storeName', res.defaultStoreName)
                              localStorage.setItem('staffId', res.defaultStaffId)
                          }
                      })
                  }
              })
              this.$router.push({path: '/order' })
  //        window.location.href = "https://www.freelycar.com/wechat/#/techome"
          }
          //如果用户已经登录，
          if (localStorage.getItem('jwt') !== null && localStorage.getItem('clientId') !== null) {
          this.trueName = localStorage.getItem('trueName')
          //若用户没有填写真实姓名，则先让其填写真实姓名
          if (this.trueName === '' || this.trueName === null) {
            alert("请完善您的真实姓名")
            this.$router.push({path: '/userInfo'})
          } else {
            //通过扫码进来的要判断门店id与用户默认id是否相同
            this.$get('/wechat/ark/getArkInfo', {
              arkSn: arkSn
            }).then(res => {
              localStorage.setItem('storeId', res.storeId)
              localStorage.setItem('arkName', res.name)
              if (res.storeId === localStorage.getItem('storeId')) {
                this.getOrderState()
              } else {
                // 更新门店信息
                this.$post('/wechat/wxuser/chooseDefaultStore', {
                  id: localStorage.getItem('id'),
                  defaultStoreId: res.storeId
                }).then(res => {
                    if (res){
                        localStorage.setItem('storeName', res.defaultStoreName)
                    }
                  this.getOrderState()
                })
              }
            })
          }
        }
        } else{
          this.$router.push({path:'/login'})
        }

      },

//      判断当前最新订单状态
      getOrderState(){
        this.$get('/wechat/order/listOrders', {
          clientId: localStorage.getItem('clientId'),
          type: 'ark'
        }).then(res => {
          if (res && res.length > 0) {
            if (res[0].state < 3) {
              this.$router.push({ path: "/myOrder"});
            }else{
              this.$router.push( {path: '/billingOrder' })
            }
          } else {
            this.$router.push( {path: '/billingOrder' })
          }
        })
      }


    },
  };
</script>

