<template>
  <div class="user-info">
    <img class="centered user-info-head" src="./../../assets/car-info-head.png" alt="">
    <img class="centered user-info-first" src="./../../assets/user-info-second.png" alt="">

    <div class="form">
      <div class="form-box">
        <img class="user-info-name" src="./../../assets/car-num.png" alt="">
        <input type="text" placeholder="请输入车牌号" v-model="licensePlate">
      </div>

      <div @click="showDrawer(licensePlate,clientId,storeId)" class="form-box">
        <img class="user-info-sex" src="./../../assets/car-band.png" alt="">
        <input type="text" placeholder="请选择品牌车系" v-model="chooseBrand.carline">
        <img class="car-band" src="./../../assets/more.png" alt="">
      </div>

      <div class="form-box">
        <img class="user-info-birth" src="./../../assets/car-img.png" alt="">
        <div class="upload-text">请上传爱车照片</div>
        <!--<img class="upload-img" src="./../../assets/upload.png" alt="">-->
      </div>

      <cube-upload v-show="!isImgShow"
                   ref="upload"
                   action="https://www.freelycar.com/api/upload/carImg"
                   :auto="true"
                   :simultaneous-uploads="1"
                   @file-success="fileSuccess"></cube-upload>
      <!--<img v-show="!isImgShow" class="car-info-upload" src="./static/check-no.png" alt="">-->
      <img v-show="isImgShow" class="car-info-upload" :src="carImageUrl" alt="">
    </div>


    <button class="big-blue-btn" @click="addCar">下一步</button>
    <router-link to="/login">
      <button class="big-gray-btn">取消</button>
    </router-link>

  </div>
</template>

<script>
  export default {
    name: 'userInfo',
    data() {
      return {
        carImageUrl:'',
        isImgShow:false,
        licensePlate:'',
        clientId:'',
        storeId:'',
        chooseBrand:{},
      }
    },
    methods: {
      // 选择车型车系
      showDrawer(licensePlate,clientId,storeId){
        this.$router.push( {path: '/choosebrand',
          query:{licensePlate,clientId,storeId,from:'/carInfo',color:this.color,img:this.carImageUrl}})
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
            color:"白色",
            carImageUrl:this.carImageUrl
          }).then(res=>{
            this.$router.push({path:'/billingOrder'})
          })
        } else {
          this.toast = this.$createToast({
            txt: '请将车牌号和品牌车系填写完整',
            type: 'txt'
          })
          this.toast.show()
        }
      },

      //上传按钮
      fileSuccess(e){
        this.carImageUrl = e.response.data
        this.isImgShow = true
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
      if(this.carImageUrl){
        this.isImgShow=true
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

  .car-info-upload
    height w(150)
    width w(150)

  .user-info
    position relative
    height 100vh
    width 100vw
    background white

  .centered
    position absolute
    transform translate(-50%,0)

  .user-info-head
    height w(185)
    width w(185)
    left 50%
    top h(96)

  .user-info-first
    height w(69)
    width w(651)
    left 50%
    top h(327)

  .form
    top h(480)
    position relative
    padding 0 $w=w(67)
    width 100vw-$w-$w

  .form img
    margin-right w(14)

  .form input
    width w(549)
    font-size w(26)
    border-bottom $border-gray
    padding-bottom h(12)
    padding-left w(20)

  .form-box
    display flex
    align-items center
    margin-bottom h(54)

  .user-info-name
    height h(41)
    width w(59)

  .user-info-sex
    height h(35)
    width w(59)

  .user-info-birth
    height h(34)
    width w(41)

  .car-band
    flex none
    position absolute
    right w(70)
    height h(23)
    width w(13)

  .upload-text
    font-size w(26)
    color #2049BF
    margin 0 w(30)

  .upload-img
    height w(24)
    width w(24)

</style>
