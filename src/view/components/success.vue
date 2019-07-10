<template>
  <div class="success">
    <img src="./../../assets/success.png" alt="">
    <div class="text1">订单取消成功</div>
    <div class="text2">谢谢您的支持，期待您下次使用！</div>
    <div class="text3"><span>{{msg}}</span>秒</div>
    <div class="text4">返回微信公众页</div>
  </div>
</template>

<script>
  export default {
    name: 'success',
    data() {
      return {
        msg: '3'
      }
    },
    methods: {},
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

  .success
    background white
    height 100vh
    width 100vw
    position relative
    color #2049BF

  .success img,div
    position absolute
    transform translateX(-50%)
    left 50%

  .success img
    height w(190)
    width w(190)
    top h(156)

  .text1
    font-size w(33)
    top h(443)

  .text2
    font-size w(25)
    top h(505)

  .text3
    font-size w(24)
    top h(665)

  .text3 span
    font-size w(60)

  .text4
    font-size w(24)
    top h(735)
</style>
