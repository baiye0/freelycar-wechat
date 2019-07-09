<template>
  <div class="choose-store">
    <input type="text" placeholder="请输入门店名称或地址">
    <button class="search-store">搜门店</button>
    <div class="store-info" v-for="(item,index) in msg"
         @click="checkedStore(index)">
      <img class="store-img" src="./../../assets/my-car-img.png" alt="">
      <span class="store-title">{{item.title}}</span>
      <span class="store-local">门店地址：{{item.local}}</span>
      <img class="checkbox" :src="index===chooseStore?'/static/check-yellow.png':'/static/check-no.png'" alt="">
    </div>
    <button class="big-blue-btn">确认</button>
  </div>
</template>

<script>
  export default {
    name: 'chooseStore',
    data() {
      return {
        msg: [
          {
            title:'徐庄研发三区店',
            local:'徐庄研发三区',
            img:''
          },
          {
            title:'紫金嘉悦',
            local:'徐庄研发三区',
            img:''
          },
          {
            title:'金奥店',
            local:'徐庄研发三区',
            img:''
          },
          {
            title:'紫金嘉悦',
            local:'徐庄研发三区',
            img:''
          },
          {
            title:'金奥店',
            local:'徐庄研发三区',
            img:''
          },
        ],
        chooseStore:0
      }
    },
    methods: {
      checkedStore(index){
        this.chooseStore = index
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

  .choose-store
    background #ffffff
    min-height 100vh
    width 100vw

  .choose-store input
    background #EEEEEE
    height h(60)
    width w(563)
    margin h(15) 0 0 w(13)
    padding 0 w(40)
    box-sizing border-box
    font-size w(25)

  .choose-store input:-ms-input-placeholder
    color #B2B2B5

  .choose-store input::-webkit-input-placeholder
    color #B2B2B5

  .choose-store input::-moz-placeholder
    color #B2B2B5

  .choose-store input:-moz-placeholder
    color #B2B2B5

  .search-store
    height h(60)
    width w(161)
    color #fff
    background $bt-blue
    border transparent
    position relative
    left w(-8)
    top h(3)

  .store-info
    height h(164)
    width w(666)
    margin 0 w(40)
    box-sizing border-box
    padding h(24) 0
    border-bottom $border-gray
    position relative

  .store-img
    height h(118)
    width w(131)
    margin-right w(32)

  .store-title
    font-size w(26)
    position absolute
    left w(163)
    top h(28)

  .store-local
    font-size w(22)
    position absolute
    left w(163)
    top h(75)
    color #B3B3B3

  .checkbox
    position absolute
    height w(37)
    width w(37)
    right w(5)
    top h(66)

</style>
