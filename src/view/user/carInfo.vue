<template>
  <div class="user-info">
    <img class="centered user-info-head" src="./../../assets/car-info-head.png" alt="">
    <img class="centered user-info-first" src="./../../assets/user-info-second.png" alt="">

    <div class="form">
      <div class="form-box">
        <img class="user-info-name" src="./../../assets/car-num.png" alt="">
        <input type="text" placeholder="请输入车牌号">
      </div>

      <div class="form-box">
        <img class="user-info-sex" src="./../../assets/car-band.png" alt="">
        <input type="text" placeholder="请选择品牌车系">
        <img class="car-band" src="./../../assets/more.png" alt="">
      </div>

      <div class="form-box">
        <img class="user-info-birth" src="./../../assets/car-img.png" alt="">
        <div class="upload-text">上传爱车照片</div>
        <img class="upload-img" src="./../../assets/upload.png" alt="">
      </div>

    </div>

    <button class="big-blue-btn">下一步</button>
    <button class="big-gray-btn">取消</button>
  </div>
</template>

<script>
  export default {
    name: 'userInfo',
    data() {
      return {

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

  .user-info
    position relative
    height 100vh
    width 100vw

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
