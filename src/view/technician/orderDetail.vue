<template>
  <div>
    <div class="order-detail-card">
      <div class="order-detail-head">
        <span>订单编号</span>
        <span>dr111111 <b>复制</b></span>
      </div>
      <div class="order-detail-info">
        <div>车牌号 <span>苏a11111</span></div>
        <div>品牌车系 <span>白色 · 宝马</span></div>
        <div>车主名字 <span>马东东</span></div>
        <div>下单时间 <span>2019-1-1 1:11</span></div>
        <div class="order-detail-item">预约项目 <span>普洗</span><span>手工打蜡</span></div>
        <div>钥匙位置 <span>xx门1号柜 <img src="./../../assets/position-blue2.png" alt=""></span></div>
        <div>停放位置 <span>xxx</span></div>
      </div>

      <div class="order-detail-other">
        <span><img src="./../../assets/call-service.png" alt="">联系车主</span>
        <span><img src="./../../assets/my-car-img.png" alt="">车辆照片</span>
      </div>

    </div>

    <button class="big-blue-btn">接单</button>
    <button class="big-gray-btn">取消</button>
  </div>
</template>

<script>
  export default {
    name: 'orderDetail',
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

  .order-detail-card
    background white
    height h(580)
    width w(727)
    padding 0 w(30)
    box-sizing border-box
    margin w(12)

  .order-detail-head
    height h(88)
    border-bottom $border-gray
    display flex
    justify-content space-between
    align-items center
    span
      color #858585
    b
      color #2049BF
      border-left $border-gray
      padding-left w(20)
      margin w(10)

  .order-detail-info
    height h(340)
    display flex
    flex-direction column
    justify-content space-between
    margin h(40) 0
    color #666666
    span
      float right
      color #333333
    img
      height h(26)
      width w(21)
      margin-left w(10)

  .order-detail-item span
    border 1px solid #2049BF
    border-radius w(30)
    padding h(5) w(15)
    color #2049BF
    margin 0 w(10)
    font-size w(23)

  .order-detail-other
    color #2049BF
    span
      float right
      margin 0 w(10)
    img
      height w(26)
      width w(26)
      margin 0 w(10)
      font-size w(26)
</style>
