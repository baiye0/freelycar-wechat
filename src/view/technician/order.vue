<template>
  <div class="order">
    <div class="order-tab">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        show-slider
        @click="clickHandler">
      </cube-tab-bar>
    </div>

    <!--待服务订单-->
    <div v-show="tabBar==='待服务订单'" v-for="(item,index) in orderList">
      <div class="order-card">
        <div class="order-card-head">
          <img src="./../../assets/car-head.png" alt="">
          <b>订单号：{{item.id}}</b>
          <span>{{item.licensePlate}} {{item.carColor}} · {{item.carBrand}}</span>
          <button @click="takeOrder(item.licensePlate,item.id,item.arkSn)" :class="[item.arkSn===arkSn?'bg-blue':'bg-gray']">接单</button>
        </div>
        <div class="order-card-info" @click="orderDetail(item.id,item.arkSn)">
          <span>车主姓名 {{item.clientName}}</span>
          <span>下单时间 {{item.createTime}}</span>
          <span>预约项目 <b>{{item.projectNames}}</b></span>
          <span>钥匙位置 {{item.keyLocation}}</span>
          <span>车辆停放位置 {{item.parkingLocation}}</span>
        </div>
        <img class="order-card-more" src="./../../assets/more.png" alt="">
      </div>
    </div>

    <!--已接到订单-->
    <div v-show="tabBar==='已接到订单'">
      <div class="order-card" v-for="(item,index) in myOrderList"
           @click="myOrderDetail(item.id,item.arkSn)">
        <div class="order-card-head">
          <img src="./../../assets/car-head.png" alt="">
          <b>订单号：{{item.id}}</b>
          <span>{{item.licensePlate}} {{item.carColor}} · {{item.carBrand}}</span>
        </div>
        <div class="order-card-myorder">
          <div>预约项目<span>{{item.projectNames}}</span></div>
          <div>接单时间<span>{{item.pickTime}}</span></div>
          <div>订单状态<span>已接车</span></div>
          <button>确认完工</button>
        </div>
        <img class="order-card-myorder-more" src="./../../assets/more.png" alt="">
      </div>
    </div>

    <!--开门成功-->
    <open-door ref="openDoor" :ark-info-state="arkInfoState" v-show="isOpenDoorShow"></open-door>
    <success ref="success" :ark-info-state="arkInfoState" v-show="isSuccessShow"></success>

    <div class="history-order-search">
      <input v-model="search" type="text" placeholder="请输入订单号或车牌号来搜索订单">
      <img @click="getOrders" src="./../../assets/search.png" alt="">
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
        }],
        search:'',
        orderList:[],
        myOrderList:[],
        tabBar:'待服务订单',
        arkSn:'',
        isOpenDoorShow:false,
        isSuccessShow:false,
        arkInfoState:'tecGetKey',
      }
    },
    methods: {
      // 待服务
      getOrders(){
        this.$get('/wechat/order/listReservationOrders',{
          licensePlate:this.search,
          storeId:localStorage.getItem('storeId')
        }).then(res=>{
          this.orderList=res
        })
      },

      // 已接到
      getFinishOrders(){
        this.$get('/wechat/order/listServicingOrders',{
          licensePlate:this.search,
          storeId:localStorage.getItem('storeId')
        }).then(res=>{
          this.myOrderList =res
        })
      },

      // 切换菜单
      clickHandler (label) {
        this.tabBar = label
      },

      // 订单详情
      orderDetail(id,arkSn){
        this.$router.push({path:'/orderDetail',query:{orderId:id,tabBar:0,arkSn:arkSn}})
      },

      // 接单
      takeOrder(licensePlate,id,arkSn){
        if(arkSn===this.arkSn){
          this.$createDialog({
            type: 'confirm',
            title: '您是否确认在柜前开始'+licensePlate+'的订单？',
            confirmBtn: {
              text: '确认',
              active: true,
              disabled: false,
              href: 'javascript:;'
            },
            cancelBtn: {
              text: '取消',
              active: false,
              disabled: false,
              href: 'javascript:;'
            },
            onConfirm: () => {
              this.pickOpen(id)
            },
            onCancel: () => {
              console.log('取消')
            }
          }).show()
        }else {
          this.toast = this.$createToast({
            txt: '非当前智能柜，不可接单',
            type: 'txt'
          })
          this.toast.show()
        }
      },

      // 接车的一键开柜
      pickOpen(id){
        this.arkInfoState = 'tecGetKey'
        this.$refs.openDoor.changeTxt('tecGetKey')
        this.$refs.success.changeTxt('tecGetKey')
        this.isOpenDoorShow=true
        this.$get('/wechat/ark/pickCar',{
          orderId:id,
          staffId:localStorage.getItem('staffId')
        }).then(res=>{
          this.isSuccessShow=true
          // setTimeout(()=>{
          //   this.$router.push({path:'/myOrder'})
          // },3000)
        })
      },

      // 已经到订单详情
      myOrderDetail(id,arkSn){
        this.$router.push({path:'/orderDetail',query:{orderId:id,tabBar:1,arkSn:arkSn}})
      },


      // changeHandler (label) {
      //   // if you clicked different tab, this methods can be emitted
      //   console.log(label)
      // }
    },
    mounted: function () {
      this.getOrders()
      this.getFinishOrders()
      this.arkSn=localStorage.getItem('arkSn')
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

  .bg-blue
    background #2049BF

  .bg-gray
    background darkgray

  .history-order-search
    height h(138)
    width 100vw
    background url("./../../assets/search-bg.png")
    background-size 100% 100%
    z-index 10
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
