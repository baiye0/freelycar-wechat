<template>
  <div class="login">
    <img class="logo" src="../../assets/login-bg.png" alt="logo">
    <div class="form">
      <div class="phone">
        <img src="../../assets/people.png" alt="账号">
        <input type="text" placeholder="请输入技师账号" v-model="account">
      </div>
      <div class="password">
        <img src="../../assets/password2.png" alt="验证码">
        <input type="text" placeholder="请输入账号密码" v-model="password">
      </div>
      <div class="btn">
        <router-link to="/login">
          <button class="switch-user">切换用户</button>
        </router-link>
        <button :class="loginBtn" @click="logIn">登录</button>
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
        account: '',
        password: '',
        passwordInfo: '获取验证码',
        isGetCode: false,
        userInfo:{
          openId:'oBaSqs8EjiGhwLVaaoHNar5Znvx4',
          headImgUrl:'http://thirdwx.qlogo.cn/mmopen/vi_32/MTFxlqUXArWp0jneoRvhXqPxhSziblzr6UFbgxateq5Ab2U1QgX57YINiac4qD2nGcNokWgtBdbdmuibVicGzkickFg/132',
          nickName:'bwh',
          gender:'女'
        },
      }
    },
    methods: {
      // 选择门店
      chooseStore(){
        this.dialog = this.$createDialog({
          type: 'prompt',
          title: '我是标题',
          prompt: {
            value: '',
            placeholder: '请输入'
          },
          onConfirm: (e, promptValue) => {
            this.$createToast({
              type: 'warn',
              time: 1000,
              txt: `Prompt value: ${promptValue || ''}`
            }).show()
          }
        }).show()
      },

      // 登录
      logIn(){
        this.$get('/wechat/employee/login',{
          account:this.account,
          password:this.password,
          openId:this.userInfo.openId,
          nickName:this.userInfo.nickName,
          phone:this.account,
          headImgUrl:this.userInfo.headImgUrl,
          gender:this.userInfo.gender,
          province:"江苏",
          city:"南京"
        }).then(res=>{
          this.axios.defaults.headers.common["Authorization"] = res.jwt
          localStorage.setItem('jwt',res.jwt)
        })
      }


    },
    computed: {
      loginBtn:function () {
        if(this.account.length===11&&this.password!==''){
          return 'login-btn-blue'
        } else {
          return 'login-btn-gray'
        }
      },
    },
    mounted(){
      // this.chooseStore()
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
    height h(43)
    width w(37)

  .password
    margin-top h(76)

  .password img
    height h(46)
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
