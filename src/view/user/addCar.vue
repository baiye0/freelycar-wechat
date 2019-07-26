<template>
  <div class="add-car">
    <div class="add-car-item">
      <span>车牌号</span>
      <input type="text" placeholder="请输入车牌号">
    </div>

    <div class="add-car-item">
      <span>品牌车系</span>
      <span class="color-blue">选择品牌<img src="./../../assets/more.png" alt=""></span>
    </div>

    <div class="add-car-item">
      <span>车辆颜色</span>
      <span class="color-blue">选择颜色<img src="./../../assets/more.png" alt=""></span>
    </div>

    <div class="add-car-item">
      <span>车辆照片</span>
      <button>上传</button>
    </div>

    <img class="add-car-img" src="./../../assets/car-head.png" alt="">

    <button class="big-blue-btn">保存</button>
  </div>
</template>

<script>
  export default {
    name: 'addCar',
    data() {
      return {
        msg: ''
      }
    },
    methods: {
      // 选择车型车系
      // 提交
      addCar(){
        this.$post('/wechat/client/addCar',{
          storeId:1,
          clientId:"ea8ecbc5694d1d1d01694d2bf15d0001",
          licensePlate:"苏C74110",
          carBrand:"别克凯越",
          carType:"",
          miles:"0",
          lastMiles:"0",
          color:"白色",
          carImageUrl:''
        })
      },

      // 上传图片
      uploadImg(){
        this.$post('/upload/carImg')
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

  .add-car
    height 100vh
    width 100vw
    background white

  .add-car-item
    height h(94)
    margin-left l=w(42)
    width 100vw-l
    border-top $border-gray
    display flex
    justify-content space-between
    align-items center
    padding-right w(42)
    box-sizing border-box

  .add-car-item img
    height h(25)
    width w(14)
    margin-left w(16)

  .add-car-item input
    width w(300)
    text-align right

  .add-car-item button
    height h(50)
    width w(100)
    border 1px solid #2458CD
    border-radius h(50)
    color #2458CD
    background white

  .color-blue
    color #2458CD

  .add-car-img
    height h(380)
    width w(667)
    position relative
    left w(40)

</style>
