<template>
  <div class="order-detail">
    <div class="order-detail-card">
      <div class="order-detail-head">
        <span>订单编号</span>
        <span>dr111111 <b v-clipboard:copy="orderId"
                          v-clipboard:success="onCopy"
                          v-clipboard:error="onError">复制</b></span>
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

    <div class="order-detail-position">
      <div class="order-detail-position-head">
        <span><img src="./../../assets/position-blue.png" alt="">车辆所在位置</span>
        <span class="order-detail-position-orange">快速定位</span>
      </div>

    </div>

    <div class="order-detail-photo">
      <div class="order-detail-position-head">
        <span><img src="./../../assets/img.png" alt="">上传车辆照片</span>
        <img src="./../../assets/add1.png" alt="">
      </div>
      <img class="order-detail-photo-img" src="./../../assets/car-info-head.png" alt="">
      <img class="order-detail-photo-del" src="./../../assets/del-img.png" alt="">
    </div>

    <div class="order-detail-btn">
      <button class="big-blue-btn">接单</button>
      <button class="big-gray-btn">取消</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderDetail',
    data() {
      return {
        msg: '',
        consumerOrder:{
          i: "A0011902280001",
          parkingLocation: "停在原位"
        },
        arkSn:'',
        staffOrderImg:{
          createTime: "2019-06-10 15:45:26",
          delStatus: false,
          id: 2,
          orderId: "",
          url:''
        }
      }
    },
    methods: {
      // 上次图片
      uploadImg(){
        this.$post('/upload/staffOrderImg',{

        })
      },

      onCopy(){
        console.log('复制成功')
      },
      onError(){
        console.log('复制失败')
      },

      // 接车的一键开柜
      pickOpen(){
        this.$get('/wechat/ark/pickCar',{
          orderId:'',
          staffId:''
        })
      },

      // 快速定位
      arkLocation(){
        this.$get('/wechat/ark/getCurrentArkLocation',{
          arkSn:''
        })
      },

      // 确认完工的一键开柜
      finishOpen(){
        this.$post('/wechat/ark/finishCar',{
          consumerOrder:this.consumerOrder,
          arkSn:this.arkSn ,
          staffOrderImg:this.staffOrderImg
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

  .order-detail
    padding-bottom h(333)

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

  .order-detail-position
    background white
    height h(220)
    width w(727)
    padding h(25) w(30)
    box-sizing border-box
    margin w(12)

  .order-detail-position-head
    display flex
    justify-content space-between
    align-items center
    span
      img
        height h(33)
        width w(29)
        margin-right w(24)
        position relative
        top h(5)
    img
      height h(33)
      width w(29)

  .order-detail-position-orange
    color #FFBD03
    text-decoration underline

  .order-detail-photo
    background white
    height h(290)
    width w(727)
    padding h(25) w(30)
    box-sizing border-box
    margin w(12)

  .order-detail-btn
    height h(333)
    width 100vw
    background url("./../../assets/button-bg.png")
    position fixed
    bottom h(50)

  .order-detail-photo-img
    height w(124)
    width w(124)
    position relative
    left w(55)
    top h(50)

  .order-detail-photo-del
    height w(29)
    width w(29)
    position relative
    left w(30)
    top h(-60)
</style>
