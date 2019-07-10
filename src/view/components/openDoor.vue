<template>
  <div class="open-door">
    <img class="open-door-img" src="./../../assets/open-door.png" alt="">
    <span>{{msg}}柜门打开，请取走钥匙，并关闭柜门</span>
    <!--<img class="open-door-car" src="./../../assets/loading-car.png" alt="">-->
    <div class="open-door-loading"></div>
  </div>
</template>

<script>
  export default {
    name: 'openDoor',
    data() {
      return {
        msg: '1号'
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

  .open-door
    background white
    height 100vh
    width 100vw
    display flex
    justify-content space-between
    flex-direction column
    align-items center
    box-sizing border-box
    padding h(179) 0 h(378) 0

  .open-door span
    color #2049BF
    font-size w(24)

  .open-door-img
    height h(184)
    width w(193)

  .open-door-car
    flex none

  .open-door-loading
    height h(23)
    width w(398)
    border 1px solid #B3B3B3
    border-radius w(12)

  .open-door-loading:after
    content ''
    background url("./../../assets/loading-car.png")
    height h(184)
    width w(193)


</style>
