<template>
  <div>
    <div class="location-info-header">
      <img src="./../../assets/cabinet.png" alt="">
      <span>001号柜</span>
      <span class="location-info-header-info">8号柜门</span>
      <span class="location-info-header-location">xxx街道</span>
    </div>

    <div class="location-info-footer">
      <div>
        <button>苏A11111</button>
        <img src="./../../assets/my-car-img.png" alt="">
      </div>
      <div>
        <span>白色 · 宝马</span>
        <b>xx街道</b>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'locationInfo',
    data() {
      return {
        msg: ''
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

  .location-info-header
    height h(123)
    width w(708)
    background white
    padding h(30) w(21)
    box-sizing border-box
    margin w(21)
    position fixed
    img
      height h(60)
      width w(44)
      margin-right w(28)
    span
      position absolute
      font-size w(30)

  .location-info-header-location
    right w(56)
    bottom h(26)
    font-size w(23)

  .location-info-header-info
    font-size w(25)
    color #8E8E8E
    top h(70)

  .location-info-footer
    height h(173)
    width w(708)
    padding h(40) w(40)
    box-sizing border-box
    margin w(21)
    position fixed
    bottom 0
    background white
    div
      display flex
      justify-content space-between
      align-items center
      margin-bottom h(25)
      img
        height w(40)
        width w(40)
      span
        color #A3A2A2
        font-size w(24)
        margin-left w(20)

</style>
