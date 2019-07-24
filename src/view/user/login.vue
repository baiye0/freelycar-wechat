<template>
  <div class="login">
    <img class="logo" src="../../assets/login-bg.png" alt="logo">

    <div class="form">
      <div class="phone">
        <img src="../../assets/phone.png" alt="电话">
        <input type="text" placeholder="请输入手机号码" v-model="phone">
      </div>
      <div class="password">
        <img src="../../assets/password.png" alt="验证码">
        <input type="text" placeholder="请输入验证码" v-model="password">
        <span :class="getCodeInfo" @click="getCode">{{passwordInfo}}</span>
      </div>
      <div class="btn">
        <router-link to="/tecLogin">
          <button class="switch-user">切换用户</button>
        </router-link>
        <button :class="loginBtn" @click="logIn">登录</button>
      </div>
    </div>

  </div>
</template>

<script>
  import wx from 'weixin-js-sdk'

  export default {
    name: 'login',
    data() {
      return {
        phone: '',
        password: '',
        passwordInfo: '获取验证码',
        data: {},
        getCodeInfoTime: 60,
        userInfo: {
          openId: 'oBaSqs8EjiGhwLVaaoHNar5Znvx4',
          headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/MTFxlqUXArWp0jneoRvhXqPxhSziblzr6UFbgxateq5Ab2U1QgX57YINiac4qD2nGcNokWgtBdbdmuibVicGzkickFg/132',
          nickName: 'bwh',
          defaultClientId: "ea8ecbc56a2a7de1016a446857530019",
          defaultStoreId: "1",
          gender: "女",
          id: "ea8ecbc56a2a7de1016a4467bce80018",
          phone: "13833131704",
          trueName: "白"
        },
        arkSn: 862057048957259,
        wxUserInfo: {}
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        if (this.phone.length === 11) {
          this.$post('/wechat/login/getSmsCode?phone=' + this.phone).then(res => {
            let info = setInterval(() => {
              if (this.getCodeInfoTime !== 0) {
                this.getCodeInfoTime -= 1
                this.passwordInfo = this.getCodeInfoTime + '秒后可重获'
              } else {
                this.passwordInfo = '获取验证码'
                this.getCodeInfoTime = 60
                clearInterval(info)
              }
            }, 1000)
            this.toast = this.$createToast({
              txt: '成功获取验证码',
              type: 'txt'
            })
            this.toast.show()
          })
        } else {
          this.toast = this.$createToast({
            txt: '请输入正确的手机号',
            type: 'txt'
          })
          this.toast.show()
        }
      },

      // 登录
      logIn() {
        if (this.phone.length === 11 && this.password.length === 6) {
          this.$post('/wechat/login/verifySmsCode?phone=' + this.phone
            + '&smscode=' + this.password
            + '&openId=' + this.userInfo.openId
            + '&headimgurl=' + this.userInfo.headImgUrl
            + '&nickName=' + this.userInfo.nickName).then(res => {
            console.log(res)
            this.wxUserInfo = res.wxUserInfo
            this.axios.defaults.headers.common["Authorization"] = res.jwt
            localStorage.setItem('jwt', res.jwt)
            // 判断是否存在柜子码
            if (this.arkSn) {
              // 检查柜子信息，看是否需要换门店
              this.getArkInfo()
            } else {
              this.$router.push({path: '/userHome'})
            }
          })
        } else {
          this.toast = this.$createToast({
            txt: '请输入正确的手机号或验证码',
            type: 'txt'
          })
          this.toast.show()
        }
      },

      // 检查柜子信息，看是否需要换门店
      getArkInfo() {
        this.$get('/wechat/ark/getArkInfo', {
          arkSn: this.arkSn
        }).then(res => {
          if (res.storeId === this.wxUserInfo.defaultStoreId) {
            this.isNewUser()
          } else {
            // 更新门店信息
            this.$post('/wechat/wxuser/chooseDefaultStore', {
              id: this.wxUserInfo.id,
              defaultStoreId: res.storeId
            }).then(res => {
              this.isNewUser()
            })
          }
        })
      },

      // 检查是否第一次登录
      isNewUser() {
        if (this.wxUserInfo.trueName) {
          this.$router.push({path: '/myOrder',query:{id:this.userInfo.defaultClientId}})
        } else {
          this.$router.push({path: '/userInfo',query:{id:this.userInfo.defaultClientId}})
        }
      }

    },
    computed: {
      loginBtn: function () {
        if (this.phone.length === 11 && this.password.length === 6) {
          return 'login-btn-blue'
        } else {
          return 'login-btn-gray'
        }
      },
      getCodeInfo: function () {
        if (this.phone.length === 11 && this.getCodeInfoTime === 60) {
          return 'password-info blue-info'
        } else {
          return 'password-info gray-info'
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  /*高度宽度*/
  h(n)
    n * 0.13vw

  w(n)
    n / 7.5vw

  .login
    height 100vh
    width 100vw
    background white

  .logo
    width 100vw

  .form
    background white
    display flex
    flex-wrap wrap
    justify-content center

  .form div
    display flex
    align-content center

  .form input
    border-bottom $border-gray
    width w(566)
    padding 0 0 w(11) 0
    margin 0 0 0 w(42)
    font-size w(30)

  .phone
    margin-top h(135)

  .phone img
    height h(46)
    width w(29)

  .password
    margin-top h(76)

  .password img
    height h(43)
    width w(38)

  .password-info
    position absolute
    width w(150)
    line-height h(45)
    font-size w(24)
    right 0
    border-left $border-gray
    padding 0 w(82) 0 w(36)
    text-align center

  .gray-info
    color darkgray

  .blue-info
    color #2049BF

  .btn
    display flex
    justify-content center

  .btn button
    height h(70)
    width w(300)
    margin w(116) w(28)
    border-radius h(35)
    border 0 solid
    color white
    font-size w(31)

  .switch-user
    background-color $bt-yellow

  .login-btn-blue
    background-color $bt-blue

  .login-btn-gray
    background-color darkgray


</style>
