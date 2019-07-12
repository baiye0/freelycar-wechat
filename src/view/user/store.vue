<template>
  <div>
    <div>
      <div class="store-head">
        <span>青创园演示柜</span>
        <span>营业时间：8：00-21:00</span>
        <span><img src="./../../assets/call-service.png" alt="">联系店家</span>
        <img src="" alt=""><span>10.9km</span>

        <hr>

        <div>
          <img src="" alt="">
          <span>南京苏宁青创园C302</span>
        </div>
      </div>
    </div>

    <div>
      <div>门店服务</div>

      <div>
        <div>汽车美容 <span>共2项</span> <img src="" alt=""></div>
        <div>
          <span>标准洗车</span>
          <span>整车外观清洗</span>
          <span>￥25</span>
          <span>门店价</span>
        </div>
      </div>

      <div>
        <div>汽车维修 <span>共2项</span> <img src="" alt=""></div>
        <div>
          <span>标准洗车</span>
          <span>整车外观清洗</span>
          <span>￥25</span>
          <span>门店价</span>
        </div>
      </div>
    </div>

    <div>
      <span>会员卡</span>
      <div>
        <div>
          <span>￥</span>
          <span>500</span>
          <span>点击购买</span>
        </div>
        <span>购买价￥400</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'store',
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

  .store-head
    height h(360)
    background url("./../../assets/store-head.png")
</style>
