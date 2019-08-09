<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    // beforeCreate(){
    //   if (localStorage.getItem('jwt')) {
    //     console.log('有jwt')
    //     this.axios.defaults.headers.common["Authorization"] = localStorage.getItem('jwt')
    //   } else{
    //     console.log('无jwt')
    //   }
    // }
  }
</script>

<style lang="stylus">
  body,div,img
    margin 0
    padding 0

  body
    background #EEEEEE

  #app
    margin 0
    padding 0

    /*min-height 100vh*/
    width 100vw
    font-family MicrosoftYaHei


</style>
