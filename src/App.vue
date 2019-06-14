<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="stylus">
  /*按钮颜色*/
  $bt-yellow = #FFBD03
  $bt-blue = #2049BF
  $bt-grey = #A0A0A0

  /*背景颜色*/
  $bg-grey = #EEEEEE

  body
    margin 0
    padding 0

  #app
    margin 0
    padding 0
    background $bg-grey


</style>
