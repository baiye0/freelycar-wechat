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
        <span class="password-info" @click="getCode">{{passwordInfo}}</span>
      </div>
      <div class="btn">
        <button class="switch-user">切换用户</button>
        <button class="login-btn">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        checked: false,
        phone: '',
        password: '',
        passwordInfo: '获取验证码',
        isGetCode: false
      }
    },
    methods: {
      // 获取验证码
      getCode() {
        if(this.phone!==''&&this.phone.length===11){
          this.$post('/wechat/login/getSmsCode',{
            phone:this.phone
          }).then(res=>{
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
      }
    }
  }
</script>

<style scoped lang="stylus">
  /*高度宽度*/
  h(n)
    n * 0.125vw

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
    border-bottom $border-grey
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
    color #2049BF
    right 0
    border-left $border-grey
    padding 0 w(82) 0 w(36)
    text-align center

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

  .login-btn
    background-color $bt-blue


</style>
