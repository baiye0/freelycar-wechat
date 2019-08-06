<template>
  <div class="billing-order">
    <div class="billing-order-card billing-order-user align-center">
      <span><img class="billing-order-img" src="./../../assets/name1.png" alt="">{{msg.name}}</span>
      <span @click="changeCar" class="billing-order-user-info">{{msg.number}}<img src="./../../assets/change.png" alt=""><b>切换</b></span>
    </div>

    <div class="billing-order-card billing-order-project">
      <div class="align-center">
        <span><img class="billing-order-img" src="./../../assets/setting-blue.png" alt="">本次预约项目</span>
        <button @click="chooseProject">项目选择</button>
      </div>
      <span class="billing-order-project-item"
            v-for="(item,index) in consumerProjectInfos">{{item.projectName}}</span>
      <span class="billing-order-project-count">合计费用： {{trueOrderPrice}}元</span>
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
      <cube-upload v-show="!isImgShow"
                   ref="upload"
                   action="https://www.freelycar.com/api/upload/carImg"
                   :auto="true"
                   :simultaneous-uploads="1"
                   @file-success="fileSuccess"></cube-upload>
      <img v-show="isImgShow" class="billing-order-car-img" :src="carImageUrl" alt="">
      <!--<img class="billing-order-photo-add" src="./../../assets/add-img.png" alt="">-->
      <!--<img class="del-img" src="./../../assets/del-img.png" alt="">-->
    </div>

    <div class="align-center billing-order-protocol" @click="changeAgreeState">
      <span class="color-blue"><img class="billing-order-img" :src="[isAgree?'/static/checked.png':'/static/no-checked.png']" alt="">同意《小易智能柜使用协议》</span>
    </div>

    <button class="big-blue-btn" @click="submit">提交</button>

    <!--模态框-->
    <div class="dialog-layer" v-show="isDialogShow">
      <div class="dialog-box billing-order-dialog">
        <div class="billing-order-dialog-header">
          <span>{{storeName}}</span>
          <img @click="closeDialog" src="./../../assets/close-black.png" alt="">
        </div>
        <div class="billing-order-dialog-content">

          <div @click="selectProject(index)" class="billing-order-dialog-item" v-for="(item,index) in projects">
            <img :src="[checkedId.indexOf(item.id)!==-1?'/static/check-yellow.png':'/static/check-no.png']" alt="">
            <span>{{item.name}}</span>
            <span class="billing-order-dialog-item-price">￥{{item.price}}</span>
            <div>{{item.comment}}</div>
          </div>

        </div>
        <div class="billing-order-dialog-footer">
          <span><b>￥</b>{{orderPrice}}</span>
          <span class="billing-order-footer-project">普洗</span>
          <button @click="selectProjectBtn">确认</button>
        </div>
      </div>
    </div>

    <open-door :ark-info-state="arkInfoState" v-show="isOpenDoorShow"></open-door>
    <success :ark-info-state="arkInfoState" v-show="isSuccessShow"></success>
  </div>
</template>

<script>
  export default {
    name: 'billingOrder',
    data() {
      return {
        msg: {
          name:'',
          number:'',
        },
        arkInfoState:'billingOrder',
        consumerOrder:{
          carId:'',
          clientId:'',
          parkingLocation:'e'
        },
        consumerProjectInfos:[],
        clientOrderImg:{
          createTime:'',
          delStatus:false,
          id:1,
          orderId:'',
          url:"https://freelycar.com/upload/clientorderimg/201906101545263ad8223882ab438fbfcf29338f429e88_lite.jpg"
        },
        projects:[],
        wxUserInfo:{},
        cars:[],
        isDialogShow:false,
        storeName:'',
        isOpenDoorShow:false,
        isSuccessShow:false,
        carImageUrl:'',
        isImgShow:false,
        isAgree:false,
        consumerProjectList:[],
        checkedId:[],
        idList:[]
      }
    },
    methods: {
      // 获取用户信息
      getUserInfo(){
        this.$get('/wechat/wxuser/getPersonalInfo',{
          id:localStorage.getItem('id')
        }).then(res=>{
          this.wxUserInfo = res.wxUserInfo
          this.cars = res.cars
          this.msg.name = res.wxUserInfo.trueName
          if(this.$route.query.licensePlate){
            this.msg.number = this.$route.query.licensePlate
            this.consumerOrder.carId=this.$route.query.id
          } else {
            this.msg.number = res.cars[0].licensePlate
            this.consumerOrder.carId=res.cars[0].id
          }
        })
      },

      // 获取门店服务列表
      getStoreProject(){
        this.$get('/wechat/ark/getProjects',{
          storeId:localStorage.getItem('storeId')
        }).then(res=>{
          this.projects = res
        })
      },

      // 上传图片
      fileSuccess(e){
        this.carImageUrl = e.response.data
        this.clientOrderImg.url = e.response.data
        this.isImgShow = true
      },

      // 选择项目按钮
      chooseProject(){
        this.consumerProjectList=this.consumerProjectInfos
        this.checkedId=this.idList
        this.isDialogShow=true
      },

      // 关闭模态框
      closeDialog(){
        this.isDialogShow=false
      },

      // 选择项目
      selectProject(index){
        // 购物车consumerProjectList。全部列表projects
        // 先看购物车里有没有点击的这个，
        let haveThisProject = false
        this.consumerProjectList.map(item=>{
          if(item.projectId===this.projects[index].id){
            haveThisProject=true
          }
        })
        //有就去掉，没有就加进去
        if(haveThisProject){
          let newList = this.consumerProjectList.filter(item=>item.projectId!==this.projects[index].id)
          let newIdList = this.checkedId.filter(item=>item!==this.projects[index].id)
          this.consumerProjectList=newList
          this.checkedId=newIdList
        }else {
          this.consumerProjectList.push({
            price:this.projects[index].price,
            projectId: this.projects[index].id,
            projectName: this.projects[index].name
          })
          this.checkedId.push(this.projects[index].id)
        }
      },

      // 确认按钮
      selectProjectBtn(){
        // 赋值给正主consumerProjectInfos
        this.consumerProjectInfos=this.consumerProjectList
        this.idList=this.checkedId
        this.closeDialog()
      },

      // 同意小易智能柜使用协议
      changeAgreeState(){
        this.isAgree=!this.isAgree
      },

      // 切换车
      changeCar(){
        this.$router.push({path:'/changeCar'})
      },

      // 快速定位

      // 删除照片

      // 提交
      submit(){
         this.isOpenDoorShow=true
         this.$post('/wechat/ark/orderService',{
           consumerOrder:this.consumerOrder,
           consumerProjectInfos:this.consumerProjectInfos,
           arkSn:localStorage.getItem('arkSn'),
           clientOrderImg:this.clientOrderImg
         }).then(res=>{
           this.isSuccessShow=true
           setTimeout(()=>{
             this.$router.push({path:'/myOrder'})
           },3000)
         })
      }
    },
    mounted: function () {
      this.storeName=localStorage.getItem('storeName')
      this.consumerOrder.clientId=localStorage.getItem('clientId')
      this.getUserInfo()
      this.getStoreProject()
    },
    computed:{
      orderPrice:function () {
        let price=0
        this.consumerProjectList.map(item=>{
          price=price+item.price
        })
        return price
      },
      trueOrderPrice:function () {
        let price=0
        this.consumerProjectInfos.map(item=>{
          price=price+item.price
        })
        return price
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

  .billing-order-car-img
    height w(125)
    width w(125)
    margin-left w(50)

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
    position absolute

  .color-blue
    color #2049BF

  .del-img
    height w(29)
    width w(29)
    position absolute
    top h(90)
    left w(158)

  .billing-order-dialog
    height h(794)
    width w(570)

  .billing-order-dialog-header
    height h(90)
    border-bottom $border-gray
    padding 0 w(30)
    display flex
    justify-content space-between
    align-items center
    img
      height w(25)
      width w(25)

  .billing-order-dialog-content
    height h(594)
    margin-left w(30)
    overflow scroll
    .billing-order-dialog-item
      padding h(30) w(30) h(30) 0
      border-bottom $border-gray
      div
        width w(360)
        margin-left w(60)
        margin-top h(20)
        font-size w(25)
        color #AFAEAE
    .billing-order-dialog-item-price
      float right
      color #FFBD03
    img
      height w(30)
      width w(30)
      margin-right w(20)

  .billing-order-dialog-footer
    height h(110)
    border-top $border-gray
    position absolute
    bottom 0
    width 100%
    padding 0 w(30)
    box-sizing border-box
    b
      color $bt-yellow
      font-size w(20)
    span
      color $bt-yellow
      font-size w(40)
      line-height h(80)
    .billing-order-footer-project
      font-size w(25)
      width w(300)
      color $bt-gray
      position absolute
      top h(40)
      left w(30)
    button
      border 1px solid #2049BF
      background white
      padding h(5) w(40)
      border-radius w(30)
      color #2049BF
      margin h(30) 0
      float right

</style>
