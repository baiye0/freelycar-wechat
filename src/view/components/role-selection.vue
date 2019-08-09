<template>
  <div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
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
        localStorage.setItem('arkSn', arkSn)

        if (localStorage.getItem('jwt')) {
          //如果技师已经登录，直接去接单页
          if (localStorage.getItem('staffId') !== null && localStorage.getItem('jwt') !== null) {
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
              arkSn: this.arkSn
            }).then(res => {
              localStorage.setItem('storeId', res.storeId)
              localStorage.setItem('storeName', res.name)
              if (res.storeId === localStorage.getItem('storeId')) {
                this.$get('/wechat/ark/getActiveOrder', {
                  clientId: clientid
                }).then(res => {
                  if (localStorage.getItem('trueName')) {
                    this.$router.push({ path: "/myOrder"});
                  } else {
                    this.$router.push( {path: '/billingOrder' })
                  }
                })
              } else {
                // 更新门店信息
                this.$post('/wechat/wxuser/chooseDefaultStore', {
                  id: this.wxUserInfo.id,
                  defaultStoreId: res.storeId
                }).then(res => {
                  this.$get('/wechat/ark/getActiveOrder', {
                    clientId: clientid
                  }).then(res => {
                    if (localStorage.getItem('trueName')) {
                      this.$router.push({ path: "/myOrder"});
                    } else {
                      this.$router.push( {path: '/billingOrder' })
                    }
                  })
                })
              }
            })
          }
        }
        } else{
          this.$router.push({path:'/login'})
        }

      },

    },
  };
</script>

