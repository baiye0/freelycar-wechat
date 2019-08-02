<template>
  <div class="success">
    <img src="./../../assets/success.png" alt="">
    <div class="text1">{{arkInfo.text1}}</div>
    <div class="text2">{{arkInfo.text2}}</div>
    <div class="text3">{{arkInfo.text3}}</div>
    <div class="text4"><span>{{msg}}</span>{{arkInfo.text4}}</div>
    <div class="text5">{{arkInfo.text5}}</div>
  </div>
</template>

<script>
  export default {
    name: 'success',
    data() {
      return {
        arkInfo: {},
        msg: 3
      }
    },
    props: [
      'arkInfoState'
    ],
    methods: {},
    mounted: function () {
      switch (this.arkInfoState) {
        case 'billingOrder': {
          this.msg = null
          this.arkInfo = {
            text1: '预约成功',
            text2: '我们已通知服务人员',
            text3: '将在30分钟内为您服务',
            text4: '感谢您使用',
            text5: '小易智能柜预约服务！'
          }
        }
        case 'cancelOrder': {
          this.msg = 3
          this.arkInfo = {
            text1: '订单取消成功',
            text2: '谢谢您的支持，期待您下次使用！',
            text3: '',
            text4: '秒',
            text5: '返回微信公众页'
          }
        }
        case 'payOrder': {
          this.msg = 3
          this.arkInfo = {
            text1: '订单已完成',
            text2: '谢谢您的支持，期待您下次使用！',
            text3: '',
            text4: '秒',
            text5: '返回微信公众页'
          }
        }
        case 'tecGetKey': {
          this.msg = null
          this.arkInfo = {
            text1: '接单成功',
            text2: '我们已通知服务车主订单状态',
            text3: '请尽快将车辆送往门店',
            text4: '',
            text5: ''
          }
        }
        case 'tecFinish': {
          this.msg = null
          this.arkInfo = {
            text1: '订单完成',
            text2: '小易爱车感谢您的服务！',
            text3: '',
            text4: '',
            text5: ''
          }
        }
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

  .success
    z-index 100
    position absolute
    top 0
    left 50%
    background white
    height 100vh
    width 100vw
    color #2049BF

  .success img, div
    position absolute
    transform translateX(-50%)
    left 50%

  .success img
    height w(190)
    width w(190)
    top h(156)

  .text1
    font-size w(35)
    font-weight 800
    top h(443)

  .text2
    font-size w(25)
    top h(565)

  .text3
    font-size w(25)
    top h(610)

  .text4 span
    font-size w(60)

  .text4
    font-size w(25)
    top h(725)

  .text5
    font-size w(25)
    top h(800)
</style>
