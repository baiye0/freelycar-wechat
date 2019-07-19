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
        <button class="switch-user">切换用户</button>
        <button :class="loginBtn" @click="logIn">登录</button>
      </div>
    </div>

  </div>
</template>

<script>
  import wx from 'weixin-js-sdk
  import axios from 'axios'

  export default {
    name: 'login',
    data() {
      return {
        phone: '',
        password: '',
        passwordInfo: '获取验证码',
        data:{},
        getCodeInfoTime:60
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        if(this.phone.length===11){
          this.$post('/api/wechat/login/getSmsCode?phone='+this.phone).then(res=>{
            let info = setInterval(()=>{
              if (this.getCodeInfoTime !== 0) {
                this.getCodeInfoTime -= 1
                this.passwordInfo = time+'秒后可重获'
              } else {
                this.passwordInfo = '获取验证码'
                this.getCodeInfoTime = 60
                clearInterval(info)
              }
            },1000)
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
      logIn(){
        if(this.phone.length===11&&this.password.length===6){

        } else {
          this.toast = this.$createToast({
            txt: '请输入正确的手机号或验证码',
            type: 'txt'
          })
          this.toast.show()
        }
      }
    },
    computed: {
      loginBtn:function () {
        if(this.phone.length===11&&this.password.length===6){
          return 'login-btn-blue'
        } else {
          return 'login-btn-gray'
        }
      },
      getCodeInfo:function () {
        if(this.phone.length===11&&this.getCodeInfoTime===60){
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
