<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      active: true,
      now: "用户",//选中的角色
      code:'',
      userinfo:{},//微信用户的个人信息
      truename:''
    };
  },
  created(){
    console.log(this.$route.params.arkSn)
    let arkSn = this.$route.params.arkSn
    localStorage.setItem('arkSn',arkSn)
    //如果技师已经登录，直接去接单页
    if (localStorage.getItem('staffinfo')!=null && localStorage.getItem('staffjwt')!=null) {
      localStorage.setItem('frompage','/role-select')
      //this.$router.push({path: '/techome' })
      window.location.href = "https://www.freelycar.com/wechat/#/techome"
    }
    //如果用户已经登录，
    if (localStorage.getItem('wxuserjwt')!=null && JSON.parse(localStorage.getItem('wxinfo'))!=null) {
      console.log(localStorage.getItem('client_truename'))
      this.truename = localStorage.getItem('client_truename')
      //若用户没有填写真实姓名，则先让其填写真实姓名
      if(this.truename=='' || this.truename==null){
        localStorage.setItem('role-truename','role-select')
        let id = localStorage.getItem('wxid')
        alert("请完善您的真实姓名")
        this.$router.push( {path: '/editpersonaldata',query:{id} })
      }else{

        //通过扫码进来的要判断门店id与用户默认id是否相同
        this.$get('/wechat/ark/getArkInfo',{arkSn:arkSn}).then(response=>{
          console.log(response.data)
          if(response.code==1){
            if(response.data.storeId!=localStorage.getItem('storeid')){
              localStorage.setItem('storeid',response.data.storeId)
              let msg = {
                id: localStorage.getItem('wxid'),
                defaultStoreId: response.data.storeId
              }
              this.$post("/wechat/wxuser/chooseDefaultStore", msg).then(
                res => {
                  console.log(res.data);
                  let clientid = res.data.defaultClientId
                  let storeid = res.data.defaultStoreId
                  localStorage.setItem('clientid',clientid)
                  localStorage.setItem('storeid',storeid)
                  //获取门店的名称
                  this.$get('/wechat/store/getDetail',{id:storeid}).then(response=>{
                        let store_name=response.data.store.name
                        // localStorage.setItem('store_name',store_name)
                  })
                  this.$get('/wechat/ark/getActiveOrder',{clientId:clientid}).then(response=>{
                      console.log(response)
                      //console.log('www')
                      //并且存在未完成的订单时,直接去预约下单页
                      if(response.data!=null){
                        let id = response.data.id
                        // this.$router.push({ path: "/book", query: { id } });
                      }else{
                        // this.$router.push( {path: '/order' })
                      }
                  })
                }
              )
            }else{

              // var clientid = localStorage.getItem('clientid')
              this.$get('/wechat/ark/getActiveOrder',{clientId:clientid}).then(response=>{
                  console.log(response)
                  //并且存在未完成的订单时,直接去预约下单页
                  if(response.data!=null){
                    let id = response.data.id
                    // this.$router.push({ path: "/book", query: { id } });
                  }else{
                    // this.$router.push( {path: '/order' })
                  }
              })
            }
          }
        })
      }
    }
  },
  methods: {

  },
};
</script>

<style scoped>

/* container */
.container {
  background-color: #f0f0f0;
}

/* container>top */
.container > .top {
  width: 100%;
  height: 146px;
  /*background-image: url("~@/assets/images/photo_placeholder.png");*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.container > .top > p {
  font-size: 0.428rem;
  line-height: 100px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
}

/* container>content */
.container > .content {
   /*width: 320px;*/
  height: 385px;
  /*box-sizing: border-box;*/
  background-color: #fff;
  opacity: 0.98;
  border-radius: 5px;
  /* margin: 0 auto;
  padding: 0 26px; */
  padding: 0 28px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: -55px;
}

.container > .content > .content-title {
  font-size: 16px;
  font-family: SimHei;
  color: #1e1e1e;
  text-align: center;
  padding: 39px 0 17px;
  border-bottom: 1px solid #e8e8e8;
}

.container > .content > .tip {
  margin-top: 20px;
}

.container > .content > .tip > p {
  font-size: .374rem;
  font-family: PingFangSC-Regular;
  color: rgba(30, 30, 30, 1);
  text-align: center;
  width: 100%;
  line-height: 24px;
}

.container > .content > .identity {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0 31px;
}

.container > .content > .identity .user {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.container > .content > .identity .user .avatar {
  width: 58px;
  height: 68px;
}

.container > .content > .identity .user .avatar img {
  width: 100%;
  height: 100%;
}

.container > .content > .identity .user p {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  color: rgba(160, 160, 160, 1);
  margin: 11px 0;
}

.container > .content > .identity .user .choose {
  width: 15px;
  height: 15px;
}

.container > .content > .identity .user .choose img {
  width: 100%;
  height: 100%;
}
/* 按钮 */
.container > .content > .confirm {
  padding-bottom: 24px;
}
.mint-button {
  border-radius: 23px;
  font-size: 14px;
  height: 45px;
}
.mint-button--primary {
  background-color: #108ee9;
}

/*分辨率小于等于360时应用以下样式*/
@media screen and (max-width: 360px) {
  .container > .content {
    height: 346px;
  }
  .container > .content > .content-title {
    padding: 25px 0 17px;
  }
  .container > .content > .identity {
    margin: 15px 0 20px;
  }
  .container > .content > .confirm {
    padding-bottom: 15px;
  }
}
</style>
