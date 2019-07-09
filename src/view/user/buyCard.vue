<template>
  <div>
    <div v-for="(item,index) in msg">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'buyCard',
    data() {
      return {
        msg: [
          {
            money:500
          }
        ]
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

</style>
