<template>
  <div class="add-car">
    <div class="add-car-item">
      <span>车牌号</span>
      <input type="text" placeholder="请输入车牌号" v-model="licensePlate">
    </div>

    <div @click="showDrawer(licensePlate,clientId,storeId)" class="add-car-item">
      <span>品牌车系</span>
      <span class="color-blue">{{chooseBrand.carline?chooseBrand.carline:'选择品牌'}}<img src="./../../assets/more.png" alt=""></span>
    </div>

    <div class="add-car-item" @click="chooseColor">
      <span>车辆颜色</span>
      <span class="color-blue">{{color?color:'选择颜色'}}<img src="./../../assets/more.png" alt=""></span>
    </div>

    <div class="add-car-item">
      <span>车辆照片</span>
      <!--<input class="add-car-upload" name="file" type="file"-->
             <!--accept="image/png,image/gif,image/jpeg" @change="update($event)"/>-->
      <!--<button>上传</button>-->
    </div>

    <cube-upload class="add-car-upload"
      ref="upload"
      action="https://www.freelycar.com/api/upload/carImg"
      :auto="true"
      :simultaneous-uploads="1" :max="1" @file-removed="fileRemoved"
      @file-success="fileSuccess"></cube-upload>

    <!--<img v-show="isImgShow" class="add-car-img" :src="carImageUrl" alt="">-->

    <button class="big-blue-btn" @click="addCar">保存</button>


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
        clientId:'',
        storeId:'',
        chooseBrand:{},
        color:'',
        backTo:'',
        colorList:[
          {text:'黑色',value:'黑色'},
          {text:'白色',value:'白色'},
          {text:'红色',value:'红色'},
          {text:'蓝色',value:'蓝色'},
          {text:'银灰色',value:'银灰色'},
          {text:'其他',value:'其他'}]
      }
    },
    methods: {
      // 选择车型车系
      showDrawer(licensePlate,clientId,storeId){
        this.$router.push( {path: '/choosebrand',
          query:{licensePlate,clientId,storeId,from:'/addCar',color:this.color,img:this.carImageUrl}})
      },

      // 选颜色
      chooseColor(){
        this.picker = this.$createPicker({
          title: '请选择服务门店',
          data: [this.colorList],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
        this.picker.show()
      },

      // 选颜色确认按钮
      selectHandle(selectedVal, selectedIndex, selectedText) {
        this.color=selectedVal[0]
      },

      //上传按钮
      fileSuccess(e){
        this.carImageUrl = e.response.data
        // this.isImgShow = true
      },

      // 删除图片
      fileRemoved(){
        this.carImageUrl = ''
      },

      // 提交
      addCar(){
        if(this.licensePlate&&this.chooseBrand.carline){
          this.$post('/wechat/client/addCar',{
            storeId:localStorage.getItem('storeId'),
            clientId:localStorage.getItem('clientId'),
            licensePlate:this.licensePlate,
            carBrand:this.chooseBrand.carline,
            carType:"",
            miles:"0",
            lastMiles:"0",
            color:this.color,
            carImageUrl:this.carImageUrl
          }).then(res=>{
            this.toast = this.$createToast({
              txt: '添加成功',
              type: 'txt'
            })
            this.toast.show()
            this.$router.push({path:this.backTo})
          })
        }else {
          this.toast = this.$createToast({
            txt: '请将车牌号和品牌车系填写完整',
            type: 'txt'
          })
          this.toast.show()
        }
      },

    },
    mounted: function () {
      this.clientId=localStorage.getItem('clientId')
      this.storeId=localStorage.getItem('storeId')
      this.chooseBrand.carbrandid = this.$route.query.carbrandid
      this.chooseBrand.carline = this.$route.query.carline
      this.chooseBrand.bgname = this.$route.query.bgname
      this.licensePlate = this.$route.query.licensePlate
      this.carImageUrl = this.$route.query.img
      this.color = this.$route.query.color
      this.backTo = this.$route.query.backTo
      if(this.carImageUrl){
        this.isImgShow=true
      }
      console.log(this.chooseBrand)
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
