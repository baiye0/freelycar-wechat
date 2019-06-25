<template>
  <div>
    <div class="my-info">
      <img class="my-info-photo" src="./../../assets/photo.png" alt="头像">
      <div>
        <span>王师傅</span>
      </div>
      <div>
        <img src="./../../assets/position.png" alt="位置">
        <span>服务门店：徐庄研发三区店</span>
        <button>更换</button>
      </div>
    </div>

    <div class="switch">
      <mt-switch v-model="switchValue">Switch</mt-switch>

    </div>

    <div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'userHome',
    data() {
      return {
        switchValue:'',
        selected: '',
        options: ['服务状态']
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

  .my-info
    height h(389)
    width 100vw
    display flex
    justify-content center
    flex-wrap wrap

  .my-info-photo
    height w(136)
    width w(136)
    border w(4) solid #ffffff
    border-radius 50%


</style>
