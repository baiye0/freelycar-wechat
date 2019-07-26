<template>
  <div class="user-info">
    <img class="centered user-info-head" src="./../../assets/head.png" alt="">
    <img class="centered user-info-first" src="./../../assets/user-info-first.png" alt="">

    <div class="form">
      <div class="form-box">
        <img class="user-info-name" src="./../../assets/name.png" alt="">
        <input type="text" placeholder="请输入真实姓名">
      </div>

      <div class="form-box">
        <img class="user-info-sex" src="./../../assets/sex.png" alt="">
      </div>
    </div>

    <button class="big-blue-btn">下一步</button>
    <button class="big-gray-btn">取消</button>
  </div>
</template>

<script>
  export default {
    name: 'userInfo',
    data() {
      return {

      }
    },
    methods: {
      submit(){
        this.$post('/wechat/wxuser/saveUserInfo',{
          id:"ea8ecbc5692ce32f01692d8d47fd0000",
          trueName:"唐炜",
          nickName:null,
          gender:"男"
        })
      }
    },
    mounted: function () {

    }
  }
</script>

<style scoped lang="stylus">

  /*高度宽度*/
  h(n)
    n * 0.13vw

  w(n)
    n / 7.5vw

  .user-info
    position relative
    height 100vh
    width 100vw
    background white

  .centered
    position absolute
    transform translate(-50%,0)

  .user-info-head
    height w(185)
    width w(185)
    left 50%
    top h(96)

  .user-info-first
    height w(69)
    width w(651)
    left 50%
    top h(327)

  .form
    top h(480)
    position relative
    padding 0 $w=w(67)
    width 100vw-$w-$w

  .form img
    margin-right w(14)

  .form input
    width w(549)
    font-size w(26)
    border-bottom $border-gray
    padding-bottom h(12)
    padding-left w(20)

  .form-box
    display flex
    align-items center
    margin-bottom h(54)

  .user-info-name
    height h(47)
    width w(53)

  .user-info-sex
    height h(43)
    width w(52)

  .user-info-birth
    height h(45)
    width w(47)

  .down-arrow
    flex none
    position absolute
    right w(70)
    height h(9)
    width w(18)
</style>
