<template>
  <div class="add-car">
    <div class="add-car-item">
      <span>车牌号</span>
      <input type="text" placeholder="请输入车牌号" v-model="licensePlate">
    </div>

    <div @click="showDrawer" class="add-car-item">
      <span>品牌车系</span>
      <span class="color-blue">选择品牌<img src="./../../assets/more.png" alt=""></span>
    </div>

    <div class="add-car-item">
      <span>车辆颜色</span>
      <span class="color-blue">选择颜色<img src="./../../assets/more.png" alt=""></span>
    </div>

    <div class="add-car-item">
      <span>车辆照片</span>
      <!--<input class="add-car-upload" name="file" type="file"-->
             <!--accept="image/png,image/gif,image/jpeg" @change="update($event)"/>-->
      <!--<button>上传</button>-->
    </div>

    <cube-upload v-show="!isImgShow" class="add-car-upload"
      ref="upload"
      action="https://www.freelycar.com/api/upload/carImg"
      :auto="true"
      :simultaneous-uploads="1"
      @file-success="fileSuccess"></cube-upload>

    <img v-show="isImgShow" class="add-car-img" :src="carImageUrl" alt="">

    <button class="big-blue-btn" @click="addCar">保存</button>

    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="data"
      :selected-index="selectedIndex"
      @change="changeHandler"
      @select="selectHandler"
      @cancel="cancelHandler"></cube-drawer>
  </div>
</template>

<script>
  export default {
    name: 'addCar',
    data() {
      return {
        msg: '',
        carImageUrl:'',
        isImgShow:false,
        licensePlate:'',
        selectedIndex:[],
        data: []
      }
    },
    methods: {
//      获取车型车系
      getAllCarBrand(){
        this.$get('/wechat/carBrand/getAllCarBrand').then(res=>{
          console.log(res)
          this.data=res
        })
      },
      // 选择车型车系
      showDrawer() {
        this.$refs.drawer.show()
        console.log('show')
      },
      changeHandler(index, item, selectedVal, selectedIndex, selectedText) {
        // fake request
        setTimeout(() => {
          let data
          if (index === 0) {
            // procince change, get city data
            data = cityList[item.value]
          } else {
            // city change, get area data
            data = areaList[item.value]
          }
          // refill panel(index + 1) data
          this.$refs.drawer.refill(index + 1, data)
        }, 200)
      },
      selectHandler(selectedVal, selectedIndex, selectedText) {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/> - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      cancelHandler() {
        console.log('cancel')
      },

      //上传按钮
      fileSuccess(e){
        this.carImageUrl = e.response.data
        this.isImgShow = true
      },

      // 提交
      addCar(){
        this.$post('/wechat/client/addCar',{
          storeId:localStorage.getItem('storeId'),
          clientId:localStorage.getItem('clientId'),
          licensePlate:this.licensePlate,
          carBrand:"别克凯越",
          carType:"",
          miles:"0",
          lastMiles:"0",
          color:"白色",
          carImageUrl:this.carImageUrl
        }).then(res=>{
          this.$router.go(-1)
        })
      },

    },
    mounted: function () {
      this.getAllCarBrand()
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
    border 1px solid #2458CD
    border-radius h(50)
    width w(50)
    color #2458CD
    background white

  .color-blue
    color #2458CD

  .add-car-img
    height h(380)
    width w(667)
    position relative
    left w(40)

  .add-car-upload
    position absolute
    transform translateX(-50%)
    left 50%
</style>
