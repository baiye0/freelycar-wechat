<template>
  <div class="change-order">
    <img class="change-order-head" src="./../../assets/head.png" alt="">
    <div class="change-order-form">
      <span>昵称</span>
      <input type="text" v-model="msg.name">
    </div>
    <div class="change-order-form">
      <span>真实姓名</span>
      <input type="text" v-model="msg.trueName">
    </div>
    <div class="change-order-form">
      <span>性别</span>
      <div>男女</div>
    </div>
    <div class="change-order-form">
      <span>手机号码</span>
      <span><input type="text" v-model="msg.phone"><b>修改</b></span>
    </div>

    <button class="big-blue-btn" @click="submit">保存</button>
  </div>
</template>

<script>
  export default {
    name: 'changeOrder',
    data() {
      return {
        msg: {
          name:'e',
          trueName:'e',
          gender:'nan',
          phone:111111111
        }
      }
    },
    methods:{
      // 获取个人信息
      getInfo(){
        this.$get('/wechat/wxuser/getDetail?',{
          id:localStorage.getItem('id')
        }).then(res=>{
          this.msg.name=res.nickName
          this.msg.trueName=res.trueName
          this.msg.gender=res.gender
          this.msg.phone=res.phone
        })
      },

      // 修改手机号
      changePhone(){
        this.$post('/wechat/login/changePhone?phone=17712344321&smsCode=983765&id=4028802767e9302a0167e935f2ab7456',{
        }).then(res=>{
          this.toast = this.$createToast({
            txt: '修改成功',
            type: 'txt'
          })
          this.toast.show()
        })
      },

      // 提交
      submit(){
        this.$post('/wechat/wxuser/saveUserInfo',{
          id:localStorage.getItem('id'),
          trueName:this.trueName,
          nickName:this.name,
          gender:this.gender
        }).then(res=>{
          this.$router.go(-1)
        })
      }
    }
  }
</script>
<style scoped lang="stylus">

  /*高度宽度*/
  h(n)
    n * 0.13vw

  w(n)
    n / 7.5vw

  .change-order
    height 100vh
    width 100vw
    background white
    padding h(280) 0 0 w(42)
    box-sizing border-box

  .change-order-head
    height h(144)
    width w(144)
    transform translate(-50%,0)
    position absolute
    top 5%
    left 50%
    border-radius 50%

  .change-order-form
    height h(90)
    border-top $border-gray
    display flex
    justify-content space-between
    align-items center
    padding-right w(45)
    input
      text-align right
    b
      color #2049BF
      margin-left w(12)
      padding-left w(12)
      border-left $border-gray


</style>
