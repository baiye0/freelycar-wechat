<template>
  <div class="buy-card">
    <span class="buy-card-store">以下会员卡仅限于{{store}}门店使用</span>

    <div class="buy-card-card" v-for="(item,index) in msg" @click="buyCard(index)">
      <div class="buy-card-title">
        <span>小易会员VIP</span>
        <span>点击购买>></span>
      </div>
      <span class="buy-card-count">{{item.price}}<b>元</b></span>
      <span class="buy-card-text">储值金额</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'buyCard',
    data() {
      return {
        msg: {},
        store:1
      }
    },
    methods: {
      // 获取卡列表
      getStoreDetail(){
        this.$get('/wechat/store/getDetail',{
          id:localStorage.getItem('storeId')
        }).then(res=>{
          this.msg = res.cardServices
        })
      },

      // 买卡
      buyCard(index){
        this.$get('/wechat/card/generateCardOrder',{
          clientId:localStorage.getItem('clientId'),
          cardServiceId:this.msg[index].id
        }).then(res=>{
          let cardId=res
        })
      }
    },
    mounted: function () {
      this.getStoreDetail()
    }
  }
</script>

<style scoped lang="stylus">

  /*高度宽度*/
  h(n)
    n * 0.13vw

  w(n)
    n / 7.5vw

  .buy-card
    background white
    min-height 100vh
    box-sizing border-box
    padding w(30)

  .buy-card-store
    font-size w(20)

  .buy-card-card
    height h(330)
    width w(690)
    background url("./../../assets/vip-card.png")
    background-size 100% 100%
    margin-top h(33)
    color white
    position relative

  .buy-card-title
    display flex
    justify-content space-between
    align-items center
    height h(48)
    font-size w(25)
    padding 0 w(42)

  .buy-card-count
    font-size w(150)
    position absolute
    top h(100)
    left w(26)

  .buy-card-count b
    font-size w(39)

  .buy-card-text
    font-size w(20)
    position absolute
    top h(270)
    left w(30)
</style>
