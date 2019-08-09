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
          headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/MTFxlqUXArWp0jneoRvhXqPxhSziblzr6UFbgxateq5Ab2U1QgX57YINiac4qD2nGcNokWgtBdbdmuibVicGzkickFg/132",
          message: "success",
          nickname: "bwh",
          openid: "oBaSqs8EjiGhwLVaaoHNar5Znvx4",
          subscribe: true
          // openId: 'oBaSqs8EjiGhwLVaaoHNar5Znvx4',
          // headImgUrl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/MTFxlqUXArWp0jneoRvhXqPxhSziblzr6UFbgxateq5Ab2U1QgX57YINiac4qD2nGcNokWgtBdbdmuibVicGzkickFg/132',
          // nickName: 'bwh',
          // defaultClientId: "ea8ecbc56a2a7de1016a446857530019",
          // defaultStoreId: "1",
          // gender: "女",
          // id: "ea8ecbc56a2a7de1016a4467bce80018",
          // phone: "13833131704",
          // trueName: "白",
          // subscribe:true
        },
        arkSn: 862057048957259,
        wxUserInfo: {},
        redirect:'',
        code:''
      }
    },
    created(){

      // console.log(localStorage.getItem('frompage'))
      this.redirect = this.$route.query.redirect
      //获取redirect的值并缓存，当值存在并改变时，改变redirect的值
      if(typeof(this.$route.query.redirect) !== "undefined"){
        localStorage.setItem('redirect',this.redirect)
      }
      console.log(localStorage.getItem('redirect'))
      this.isweixin()

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
            + '&openId=' + this.userInfo.openid
            + '&headimgurl=' + this.userInfo.headimgurl
            + '&nickName=' + this.userInfo.nickname).then(res => {
            console.log(res)
            this.wxUserInfo = res.wxUserInfo
            this.axios.defaults.headers.common["Authorization"] = res.jwt
            localStorage.setItem('jwt', res.jwt)
            localStorage.setItem('phone', this.wxUserInfo.phone)
            localStorage.setItem('clientId', this.wxUserInfo.defaultClientId)
            localStorage.setItem('id', this.wxUserInfo.id)
            localStorage.setItem('openId', this.wxUserInfo.openId)
            localStorage.setItem('Authorization', "Bearer " + res.jwt)
            // 判断是否存在柜子码
            if (localStorage.getItem('arkSn')) {
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
          arkSn: localStorage.getItem('arkSn')
        }).then(res => {
          localStorage.setItem('storeId', res.storeId)
          localStorage.setItem('storeName', res.name)
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

      //判断受否是微信内置浏览器
      isweixin() {
        //判断是否是微信浏览器
        let ua = window.navigator.userAgent.toLowerCase()
        console.log('ua',ua)
        if(ua.indexOf('micromessenger') !== -1){
          this.isCode()
        } else {
          console.log("请在微信客户端打开！")
          return false
        }
      },

      //判断是否存在code参数
      isCode(){
        if(this.getQueryString("code")!=null){
          this.code = this.getQueryString("code")
          console.log("第一次code"+this.code)
          // 页面里的code和localstorage里的一样
          if(this.code===localStorage.getItem("code")){
            this.userInfo.openid=localStorage.getItem('openId')
            this.userInfo.headimgurl=localStorage.getItem('headImgUrl')
            this.userInfo.nickname=localStorage.getItem('nickName')
            this.userInfo.subscribe=localStorage.getItem('subscribe')
            console.log(localStorage.getItem('subscribe'))

            // 是否关注公众号
            if(localStorage.getItem('subscribe') == "false"){
              window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNDMwNDc3Mw==&scene=126&bizpsid=0&subscene=0#wechat_redirect"
            }
          }else{
            //将code保存起来
            localStorage.setItem("code",this.code)
            console.log("第二次code"+this.code)
            //获取个人信息
            this.$get('/wechat/config/getWeChatUserInfo',{
              code:this.code
            }).then(res=>{
              console.log(res)
              this.userInfo = res
              localStorage.setItem('openId',this.userInfo.openid)
              localStorage.setItem('subscribe',this.userInfo.subscribe)
              localStorage.setItem('nickName',this.userInfo.nickname)
              localStorage.setItem('headImgUrl',this.userInfo.headimgurl)
              // 是否关注公众号
              if(localStorage.getItem('subscribe') == "false"){
                window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNDMwNDc3Mw==&scene=126&bizpsid=0&subscene=0#wechat_redirect"
              }
            })
          }
        }else{
          //console.log('未授权')
        //window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd188f8284ee297b&redirect_uri=https%3A%2F%2Fwww.freelycar.com%2Fwechat%2Flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
          window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd188f8284ee297b&redirect_uri=https%3a%2f%2fwww.freelycar.com%2fwechat%2flogin&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      },

      //判断参数是否存在
      getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
          return unescape(r[2]);
        }
        return null;
      },

      // 检查是否第一次登录
      isNewUser() {
        if (this.wxUserInfo.trueName) {
          this.$router.push({path: '/myOrder',query:{id:this.wxUserInfo.defaultClientId}})
        } else {
          this.$router.push({path: '/userInfo',query:{id:this.wxUserInfo.defaultClientId}})
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
