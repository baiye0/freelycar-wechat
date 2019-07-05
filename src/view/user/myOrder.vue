<template>
  <div class="my-order">
    <div class="order-card" v-for="(item,index) in msg">
      <div class="order-state">
        <span class="order-state-title">{{orderState}}</span>
        <span class="order-state-time">{{item.createTime}}</span>
      </div>

      <div class="order-info">
        <span class="order-info-brand">{{item.licensePlate}}  {{item.carBrand}}</span>
        <button class="order-info-type">普洗</button>
        <span class="order-info-num">订单编号 {{item.id}}</span>
        <img class="order-info-more" src="./../../assets/more.png" alt="">
      </div>

      <div class="order-img">
        <span>查看技师拍摄爱车状态照片</span>
        <img src="./../../assets/my-car-img.png" alt="">
      </div>

      <div class="open-the-door">
        <span><img src="./../../assets/call-service.png" alt="">联系客服</span>
        <button>立即开柜</button>
      </div>

      <div class="">
        <span>待付款￥</span><span>120</span>
        <img src="./../../assets/call-service.png" alt="">
        <span>联系客服</span>
        <button>立即支付</button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'myOrder',
    data() {
      return {
        msg: [
          {
            id: "ff80808168183a910",
            delStatus: false,
            createTime: "2019-01-04",
            storeId: "1",
            carId: "4028802767e9302a0167e935f2c40003",
            carBrand: "别克凯越",
            carType: "2016自动挡",
            licensePlate: "牛B74DSB",
            clientId: "4028802767e9302a0167e935f2ab0002",
            clientName: "李四",
            gender: null,
            phone: "18918907788",
            deliverTime: "2019-01-04T09:39:16.000+0000",
            finishTime: null,
            pickTime: null,
            lastMiles: 2222,
            miles: 3333,
            parkingLocation: null,
            state: 0,
            totalPrice: 0,
            actualPrice: 0,
            firstPayMethod: null,
            firstActualPrice: null,
            firstCardOrCouponId: null,
            secondPayMethod: null,
            secondActualPrice: null,
            secondCardOrCouponId: null,
            payState: 0,
            pickCarStaffId: "4028a18167ce66590167ce683ac60000",
            orderType: 1,
            cardOrCouponId: null,
            faultDescription: "我就洗个车，有啥故障啊？",
            useTime: null,
            member: false
          },
          {
            id: "ff80808168183a910168183b86890000",
            delStatus: false,
            createTime: "2019-01-04",
            storeId: "1",
            carId: "4028802767e9302a0167e935f2c40003",
            carBrand: "别克凯越",
            carType: "2016自动挡",
            licensePlate: "牛B74DSB",
            clientId: "4028802767e9302a0167e935f2ab0002",
            clientName: "李四",
            gender: null,
            phone: "18918907788",
            deliverTime: "2019-01-04T09:39:16.000+0000",
            finishTime: null,
            pickTime: null,
            lastMiles: 2222,
            miles: 3333,
            parkingLocation: null,
            state: 0,
            totalPrice: 0,
            actualPrice: 0,
            firstPayMethod: null,
            firstActualPrice: null,
            firstCardOrCouponId: null,
            secondPayMethod: null,
            secondActualPrice: null,
            secondCardOrCouponId: null,
            payState: 0,
            pickCarStaffId: "4028a18167ce66590167ce683ac60000",
            orderType: 1,
            cardOrCouponId: null,
            faultDescription: "我就洗个车，有啥故障啊？",
            useTime: null,
            member: false
          },
          {
            id: "ff80808168183a910168183b86890000",
            delStatus: false,
            createTime: "2019-01-04",
            storeId: "1",
            carId: "4028802767e9302a0167e935f2c40003",
            carBrand: "别克凯越",
            carType: "2016自动挡",
            licensePlate: "牛B74DSB",
            clientId: "4028802767e9302a0167e935f2ab0002",
            clientName: "李四",
            gender: null,
            phone: "18918907788",
            deliverTime: "2019-01-04T09:39:16.000+0000",
            finishTime: null,
            pickTime: null,
            lastMiles: 2222,
            miles: 3333,
            parkingLocation: null,
            state: 0,
            totalPrice: 0,
            actualPrice: 0,
            firstPayMethod: null,
            firstActualPrice: null,
            firstCardOrCouponId: null,
            secondPayMethod: null,
            secondActualPrice: null,
            secondCardOrCouponId: null,
            payState: 0,
            pickCarStaffId: "4028a18167ce66590167ce683ac60000",
            orderType: 1,
            cardOrCouponId: null,
            faultDescription: "我就洗个车，有啥故障啊？",
            useTime: null,
            member: false
          }
        ]
      }
    },
    methods: {},
    mounted: function () {

    },
    computed:{
      orderState:function () {
        return '订单已完成'
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

  .my-order
    background #EEEEEE
    padding-top h(20)

  .order-card
    background white
    width 100vw-w(24)
    margin 0 h(20) h(20) h(20)
    padding 0 w(32)


  .order-card div
    display flex
    width w(666)
    border-bottom $border-gray
    overflow scroll

  .order-state
    justify-content space-between
    align-items center
    height h(96)

  .order-state-title
    color #2049BF
    font-size w(27)

  .order-state-time
    color #858585
    font-size w(25)

  .order-info
    height h(250)
    justify-content center
    align-items flex-start
    flex-direction column
    padding h(10) 0

  .order-info-brand
    font-size w(26)

  .order-info-num
    font-size w(26)
    color #C0C0C0

  .order-info-more
    height h(25)
    width w(14)
    position absolute
    right w(41)

  .order-info-type
    height h(55)
    width w(133)
    border 1px solid #2049BF
    background white
    color #2049BF
    font-size w(24)
    border-radius 28px
    margin h(36) 0

  .order-img
    height h(89)
    font-size w(24)
    color #2049BF
    justify-content space-between
    align-items center

  .order-img img
    height w(32)
    width w(32)

  .open-the-door
    height h(89)
    justify-content space-between
    align-items center
    font-size w(23)
    color #2049BF

  .open-the-door img
    height w(25)
    width w(25)
    margin 0 w(5)

  .open-the-door button
    height h(55)
    width w(190)
    background $bt-blue
    color white
    border transparent
    border-radius w(30)


</style>
