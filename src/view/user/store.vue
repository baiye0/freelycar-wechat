<template>
  <div class="store">
    <div class="store-head">
      <div class="store-head-card">
        <span class="store-head-title">{{store.name}}</span>
        <span class="store-head-time">营业时间：{{store.openingTime}}-{{store.closingTime}}</span>
        <div class="store-head-call"><img src="./../../assets/call-service.png" alt=""><span>联系店家</span></div>
        <div class="store-head-img">
          <img src="./../../assets/distance.png" alt="">
          <span>10.9km</span>
        </div>

        <hr>

        <div class="store-head-location">
          <img src="./../../assets/position-gray.png" alt="">
          <span>{{store.address}}</span>
        </div>
      </div>
    </div>

    <div class="store-service">
      <div class="store-service-title flex-center">门店服务</div>

      <div v-for="(item,index) in projects">
        <div class="store-service-item-title flex-center">
          <span>{{item.projectTypeName}} <b>共{{item.projectInfos.length}}项</b></span>
          <img src="./../../assets/up.png" alt="">
        </div>
        <div v-for="(projectItem,projuctIndex) in item.projectInfos" class="flex-center store-service-item">
          <div>
            <span class="store-service-items">{{projectItem.name}}</span>
            <span class="store-service-info">{{projectItem.comment}}</span>
          </div>
          <div>
            <span class="store-service-price">￥{{projectItem.price}}</span>
            <span class="store-service-price-info">门店价</span>
          </div>
        </div>
      </div>

    </div>

    <div class="store-card">
      <span>会员卡</span>
      <div class="store-card-box">

        <div class="store-card-box-scroll">
          <div class="store-card-item-box" v-for="(item,index) in cardServices">
            <div class="store-card-item">
              <span class="store-card-item-price"><b>￥</b>{{item.price}}</span>
              <div><span>点击购买</span></div>
            </div>
            <div class="store-card-item-info">购买价 ￥{{item.actualPrice}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'store',
    data() {
      return {
        storeImgs:[{
          url:''
        }],
        store:{},
        projects:[],
        cardServices:[]
      }
    },
    methods: {
      getStoreDetail(){
        this.$get('/wechat/store/getDetail',{
          id:1
        }).then(res=>{
          this.storeImgs = res.storeImgs
          this.store = res.store
          this.projects = res.projects
          this.cardServices = res.cardServices
        })
      },

      getImg(){
        this.$get('/wechat/store/getImgs',{
          storeId:1
        }).then(res=>{
          console.log(res)
        })
      }
    },
    mounted: function () {
      this.getStoreDetail()
      this.getImg()
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
    width 100vw
    background url("./../../assets/store-head.png") no-repeat
    background-size 100% h(229)

  .store-head-card
    width w(650)
    height h(170)
    background white
    border-radius 5px
    box-shadow 0 0 10px #ababab
    position absolute
    top h(150)
    left w(50)
    padding w(30)
    box-sizing border-box
    font-size w(24)
    color #858585

  .store-head-title
    font-size w(27)
    color black
    position absolute

  .store-head-call img
    height w(25)
    width w(25)
    margin 0 w(5)

  .store-head-call
    color #2049BF
    text-align center
    position absolute
    top h(75)
    left w(330)
    display flex
    align-items center

  .store-head-img img
    height w(36)
    width w(36)
    margin-bottom h(5)

  .store-head-img
    position absolute
    right w(30)
    top h(30)
    font-size w(16)
    width w(80)
    display flex
    align-items center
    flex-direction column

  .store-head-time
    position absolute
    top h(75)

  .store-head hr
    position absolute
    top h(105)
    width w(590)

  .store-head-location
    display flex
    align-items center
    position absolute
    top h(130)
    img
      height h(25)
      width w(17)
      margin 0 w(10)

  .store-service
    background white
    margin-bottom h(16)

  .store-service-title
    height h(77)
    padding 0 w(40)

  .flex-center
    display flex
    justify-content space-between
    align-items center
    border-bottom $border-gray
    position relative

  .store-service-item-title
    height h(74)
    padding 0 w(40)
    font-size w(26)
    b
      color #858585
      font-size w(20)
      margin-left w(10)
    img
      width w(25)
      height h(14)

  .store-service-item
    height h(115)
    padding 0 w(44) 0 w(61)

  .store-service-items
    position absolute
    top h(35)
    font-size w(24)

  .store-service-info
    position absolute
    top h(75)
    font-size w(18)
    color #9F9E9E

  .store-service-price
    color #FFBD03
    font-size w(24)
    position absolute
    right w(44)
    top h(35)

  .store-service-price-info
    color #9F9E9E
    font-size w(18)
    position absolute
    right w(44)
    top h(75)
    text-decoration line-through

  .store-card
    background white
    height h(288)
    position relative
    padding h(30) w(40)

  .store-card-box
    overflow-x scroll
    height h(200)

  .store-card-box-scroll
    width w(10000)

  .store-card-item-box
    display inline-block
    width w(189)
    height h(170)
    float left
    position relative
    margin h(26) w(17) 0 0

  .store-card-item
    height h(118)
    width w(189)
    color white
    background url("./../../assets/card-blue.png") no-repeat
    background-size 100% 100%
    position relative
    div
      height h(40)
      width w(189)
      display flex
      align-items center
      justify-content center
      font-size w(22)
      position absolute
      bottom 0

  .store-card-item-price
    font-size w(42)
    position absolute
    transform translate(-50%,-50%)
    top 30%
    left 45%
    b
      font-size w(24)

  .store-card-item-info
    color #FFBD03
    font-size w(22)
    position absolute
    margin-top h(18)
    width w(189)
    display flex
    align-items center
    justify-content center

</style>
