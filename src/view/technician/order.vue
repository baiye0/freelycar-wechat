<template>
  <div class="order">
    <div class="order-tab">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        show-slider
        @click="clickHandler"
        @change="changeHandler">
      </cube-tab-bar>
    </div>

    <div>
      <div class="order-card">
        <div class="order-card-head">
          <img src="./../../assets/car-head.png" alt="">
          <b>订单号：dr111111</b>
          <span>苏a11111 白色 · 宝马</span>
          <button>接单</button>
        </div>
        <div class="order-card-info">
          <span>车主姓名 马东东</span>
          <span>下单时间 2019-1-1 9:00</span>
          <span>预约项目 <b>普洗</b><b>手工打蜡</b></span>
          <span>钥匙位置 xx门01号柜</span>
          <span>车辆停放位置 xxx</span>
        </div>
        <img class="order-card-more" src="./../../assets/more.png" alt="">
      </div>
    </div>

    <div>
      <div class="order-card">
        <div class="order-card-head">
          <img src="./../../assets/car-head.png" alt="">
          <b>订单号：dr111111</b>
          <span>苏a11111 白色 · 宝马</span>
        </div>
        <div class="order-card-myorder">
          <div>预约项目<span>普洗</span><span>手工打蜡</span></div>
          <div>接单时间<span>2019-1-1</span></div>
          <div>订单状态<span>已接车</span></div>
          <button>确认完工</button>
        </div>
        <img class="order-card-myorder-more" src="./../../assets/more.png" alt="">
      </div>
    </div>

    <div class="history-order-search">
      <input type="text" placeholder="请输入订单号或车牌号来搜索订单">
      <img src="./../../assets/search.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data() {
      return {
        msg: '',
        selectedLabelDefault: '待服务订单',
        tabs: [{
          label: '待服务订单',
        }, {
          label: '已接到订单',
        }]
      }
    },
    methods: {
      // 待服务
      getOrders(){
        this.$get('/wechat/order/listReservationOrders',{
          licensePlate:'',
          storeId:''
        }).then(res=>{

        })
      },

      // 已接到
      getFinishOrders(){
        this.$get('/wechat/order/listServicingOrders',{
          licensePlate:'',
          storeId:''
        }).then(res=>{

        })
      },

      clickHandler (label) {
        // if you clicked home tab, then print 'Home'
        console.log(label)
      },
      changeHandler (label) {
        // if you clicked different tab, this methods can be emitted
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

  .order
    padding 0 0 h(140) 0

  .cube-tab-bar
    padding 10px 0

  .order-tab
    background white

  .history-order-search
    height h(138)
    width 100vw
    background url("./../../assets/search-bg.png")
    background-size 100% 100%
    position fixed
    bottom 0

  .history-order-search img
    height w(30)
    width w(30)
    position absolute
    bottom h(28)
    right w(53)

  .history-order-search input
    height h(60)
    width w(710)
    border-radius h(30)
    position absolute
    bottom h(13)
    left w(20)
    font-size w(20)
    padding-left w(33)
    box-sizing border-box

  .order-card
    background white
    height h(341)
    width w(727)
    margin w(12)
    padding 0 w(29)
    box-sizing border-box
    position relative

  .order-card-head
    height h(90)
    border-bottom $border-gray
    position relative
    img
      height w(67)
      width w(67)
      border-radius w(35)
      position absolute
      top h(12)
    button
      height h(46)
      width w(110)
      background #2049BF
      color white
      border-radius h(25)
      border transparent
      position absolute
      right w(11)
      top h(23)
    b
      font-size w(20)
      position absolute
      top h(16)
      left w(95)
      color #858585
    span
      font-size w(25)
      position absolute
      top h(48)
      left w(95)

  .order-card-info
    height h(210)
    margin h(20) 0
    font-size w(25)
    display flex
    justify-content space-between
    flex-direction column
    b
      border 1px solid #2049BF
      color #2049BF
      padding h(3) w(19)
      margin-right w(10)
      border-radius w(25)

  .order-card-more
    height h(25)
    width w(14)
    position absolute
    top h(198)
    right w(31)

  .order-card-myorder
    padding h(28) 0
    font-size w(25)
    position relative
    div
      margin-bottom h(25)
    span
      float right
    button
      color white
      border transparent
      height h(46)
      width w(160)
      background #FFBD03
      position absolute
      bottom h(-15)
      right w(-5)
      border-radius h(25)
  .order-card-myorder-more
    height h(25)
    width w(14)
    position absolute
    right w(31)
    top h(33)
</style>
