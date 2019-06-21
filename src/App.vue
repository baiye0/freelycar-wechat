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
  body,div,img
    margin 0
    padding 0

  #app
    margin 0
    padding 0
    background $bg-grey
    height 100vh
    width 100vw
    font-family MicrosoftYaHei


</style>
