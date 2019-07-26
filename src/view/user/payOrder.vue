<template>
  <div class="pay-order">
    <div class="pay-order-card">
      <div class="pay-order-card-item">
        <span>订单编号</span>
        <span class="pay-order-info-gray">dr10101101001<b class="pay-order-info-blue copy">复制</b></span>
      </div>
      <div class="pay-order-card-item">
        <span>下单时间</span>
        <span class="pay-order-info-gray">2019-1-1</span>
      </div>
      <div class="pay-order-card-item">
        <span>支付方式</span>
        <span class="pay-order-info-gray">会员卡（000）</span>
      </div>
    </div>

    <div class="pay-order-card">
      <div class="pay-order-card-item">
        <span>车辆信息</span>
        <span class="pay-order-info-gray">苏A12345</span>
      </div>
      <div class="pay-order-card-item">
        <span>车主信息</span>
        <span class="pay-order-info-gray">马东东11111111</span>
      </div>
      <div class="pay-order-card-item">
        <span>车辆位置</span>
        <span class="pay-order-info-gray">01号柜-青创园</span>
      </div>
    </div>

    <div class="pay-order-card">
      <div class="pay-order-card-item">
        <span>支付方式</span>
        <span class="pay-order-info-blue">会员卡（000）<img class="pay-order-more" src="./../../assets/more.png" alt=""></span>
      </div>
      <div class="pay-order-card-item">
        <span>卡内余额</span>
        <span class="pay-order-info-blue">1元</span>
      </div>
      <div class="pay-order-card-item">
        <span>抵用券</span>
        <span class="pay-order-info-blue">已有2张<img class="pay-order-more" src="./../../assets/more.png" alt=""></span>
      </div>
    </div>

    <div class="pay-order-card">
      <div class="pay-order-card-item">
        <span>xxx店<img class="pay-order-more" src="./../../assets/more.png" alt=""></span>
      </div>
      <div class="pay-order-card-item-second">
        <div>
          <span class="pay-order-info-gray">普洗</span>
          <span class="pay-order-info-yellow">￥25</span>
        </div>
        <div>
          <span class="pay-order-info-gray">手工打蜡</span>
          <span class="pay-order-info-yellow">￥95</span>
        </div>
      </div>
      <div class="pay-order-card-item">
        <span>抵扣</span>
        <span class="pay-order-info-yellow">-￥10</span>
      </div>
      <div class="pay-order-card-item">
        <span class="pay-order-info-gray">总计￥120 <img class="call-service" src="./../../assets/call-service.png" alt=""><b class="pay-order-info-blue">联系店家</b></span>
        <span>实付<b class="pay-order-info-yellow">￥110</b></span>
      </div>
    </div>

    <div class="pay-order-button">
      <span class="pay-order-info-yellow">￥110 <b class="pay-order-info-gray">已优惠￥10</b></span>
      <button>立即结算</button>
    </div>

    <button class="blue-btn" v-show="msg">订单跟踪</button>
    <button class="gray-btn" v-show="msg">取消订单</button>
  </div>
</template>

<script>
  export default {
    name: 'payOrder',
    data() {
      return {
        msg: '',
        orderId:''
      }
    },
    methods: {
      getOrderDetail(){
        this.$get('/wechat/order/getOrderDetail',{
          id:this.orderId
        }).then(res=>{
          console.log(res)
        })
      },

      // 取消
      cancelOrder(){
        this.$get('/wechat/ark/cancelOrderService',{
          id:''
        }).then(res=>{

        })
      },

      // 支付
      wxPay(){
        this.$post('/wechat/pay/payOrderByWechat',{
          openId: "ojtNs1vQCAHik8kc93vuoAKJlCzs",
          orderId: "A0011902110002",
          totalPrice:1
        }).then(res=>{

        })
      },

      // 取车
      getCar(){
        this.$get('/wechat/ark/orderFinish',{
          id:''
        }).then(res=>{

        })
      }
    },
    mounted: function () {
      this.orderId = this.$route.query.orderId
      this.getOrderDetail()
    }
  }
</script>

<style scoped lang="stylus">

  /*高度宽度*/
  h(n)
    n * 0.13vw

  w(n)
    n / 7.5vw

  .pay-order
    margin-bottom h(90)
    position relative
    background #EEEEEE

  .blue-btn
    height h(84)
    width w(579)
    border-radius w(40)
    border transparent
    color white
    font-size w(32)
    background $bt-blue
    position relative
    transform translate(-50%,0)
    left 50%
    margin h(50) 0 0 0

  .gray-btn
    height h(84)
    width w(579)
    border-radius w(40)
    border transparent
    color white
    font-size w(32)
    background $bt-gray
    position relative
    transform translate(-50%,0)
    left 50%
    margin h(50) 0

  .pay-order-more
    height w(25)
    width w(14)
    margin-left w(23)
    top h(4)
    position relative

  .pay-order div
    box-sizing border-box

  .pay-order-card
    background white
    width 100vw
    margin-bottom h(17)

  .pay-order-card-item
    height h(86)
    margin 0 w(42)
    border-bottom $border-gray
    display flex
    justify-content space-between
    align-items center

  .pay-order-card-item-second
    border-bottom $border-gray
    margin 0 w(42)

  .pay-order-card-item-second div
    height h(67)
    font-size w(25)
    display flex
    justify-content space-between
    align-items center

  .pay-order-info-gray
    color #858585

  .pay-order-info-blue
    color #2049BF

  .pay-order-info-yellow
    color #FFBD03

  .call-service
    height w(25)
    width w(25)
    margin 0 w(7) 0 w(29)

  .pay-order-button
    height h(84)
    width 100vw
    position fixed
    bottom 0
    background white
    display flex
    justify-content space-between
    align-items center

  .pay-order-button span
    margin 0 w(38)
    font-size w(35)

  .pay-order-button b
    font-size w(25)
    margin 0 w(10)

  .pay-order-button button
    background $bt-blue
    color white
    height h(83)
    width w(263)
    border transparent

  .copy
    padding-left w(15)
    margin-left w(15)
    border-left $border-gray
    font-size w(25)
</style>
