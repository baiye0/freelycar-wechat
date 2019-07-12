<template>
  <div class="billing-order">
    <div class="billing-order-card billing-order-user align-center">
      <span><img class="billing-order-img" src="./../../assets/name1.png" alt="">{{msg.name}}</span>
      <span class="billing-order-user-info">{{msg.number}}<img src="./../../assets/change.png" alt=""><b>切换</b></span>
    </div>

    <div class="billing-order-card billing-order-project">
      <div class="align-center">
        <span><img class="billing-order-img" src="./../../assets/setting-blue.png" alt="">本次预约项目</span>
        <button>项目选择</button>
      </div>
      <span class="billing-order-project-item">普洗</span>
      <span class="billing-order-project-item">手工打蜡</span>
      <span class="billing-order-project-count">合计费用： 0元</span>
    </div>

    <div class="billing-order-card billing-order-position">
      <div class="align-center">
        <span><img class="billing-order-img" src="./../../assets/position-blue.png" alt="">车辆所在位置</span>
        <span class="billing-order-position-button">快速定位</span>
      </div>

      <textarea class="billing-order-position-input" placeholder="请输入位置" name="" id="" cols="38" rows="3"></textarea>
    </div>

    <div class="billing-order-card billing-order-photo">
      <div class="align-center">
        <span><img class="billing-order-img" src="./../../assets/img.png" alt="">上传爱车照片</span>
      </div>
      <img class="billing-order-photo-add" src="./../../assets/add-img.png" alt="">
      <img class="del-img" src="./../../assets/del-img.png" alt="">
    </div>

    <div class="align-center billing-order-protocol">
      <span class="color-blue"><img class="billing-order-img" src="./../../assets/no-checked.png" alt="">同意《小易智能柜使用协议》</span>
    </div>

    <button class="big-gray-btn">提交</button>
  </div>
</template>

<script>
  export default {
    name: 'billingOrder',
    data() {
      return {
        msg: {
          name:'马东东',
          number:'苏a122222',
        }
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

  .billing-order
    height 100vh
    width 100vw
    background white

  .billing-order-card
    margin-left l=w(42)
    width 100vw-l
    border-bottom $border-gray
    padding-right w(43)
    box-sizing border-box

  .billing-order-img
    height w(30)
    width w(30)
    margin-right w(25)

  .align-center
    display flex
    justify-content space-between
    align-items center

  .align-center span
    display flex
    align-items center

  .billing-order-user
    height h(103)

  .billing-order-user-info img
    height w(18)
    width w(18)
    margin 0 w(7) 0 w(28)

  .billing-order-user-info b
    color #2049BF

  .billing-order-project
    height h(210)
    position relative

  .billing-order-project button
    height h(44)
    width w(146)
    color white
    background #2049BF
    border-radius h(30)
    border transparent

  .billing-order-project div
    height h(103)

  .billing-order-project-item
    height h(55)
    border 1px solid #2049BF
    color #2049BF
    border-radius h(30)
    padding h(12) w(40)
    box-sizing border-box
    font-size w(24)
    margin w(24)

  .billing-order-project-count
    color #B3B3B3
    font-size w(22)
    position absolute
    right w(50)
    bottom h(20)

  .billing-order-position
    height h(250)

  .billing-order-position-button
    font-size w(26)
    color #FFBD03

  .billing-order-position-input
    border transparent
    color #AEAEAE

  .billing-order-position div
    height h(103)

  .billing-order-photo
    height h(277)
    position relative

  .billing-order-photo div
    height h(103)

  .billing-order-photo-add
    height w(125)
    width w(125)
    margin-left w(50)

  .billing-order-protocol
    height h(103)
    margin-left w(42)

  .color-blue
    color #2049BF

  .del-img
    height w(29)
    width w(29)
    position absolute
    top h(90)
    left w(158)
</style>
