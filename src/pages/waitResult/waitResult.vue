<template>
  <view class="bg-white " style="height: 100vh;" >
    <cu-custom class="" :isBack="true">
      <block slot="content">{{title}}</block>
    </cu-custom>
    <view class="text-center   flex align-center justify-center" :style="`height: calc(100vh - ${CustomBar}px)`">
      <view>
          <image :src="images" style=""/>
          <view class="text-gray">
            <text class="margin-bottom"> {{text}}</text>
            <button v-if="status" class="bg-green margin-top round" @tap="handleToRechargeRecord">查看充值记录</button>
            <button v-if="status" class="bg-gray margin-top round" @tap="handleToHome">返回首页</button>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
    import {checkRechargeReuslt} from "../../api/orders";

    export default {
        name: "waitResult",
        data(){
            return {
              cardno:'',
              outtradeno:'',
              images:'../../static/undraw_loading_frh4.png',
              text:'请稍后...',
              status:0,
              StatusBar: this.StatusBar,
              CustomBar: this.CustomBar,
              title:'等待充值结果...'
            }
        },
        async onLoad(options){
            console.log(`调试:接收到参数`, options);

           let { outtradeno,cardno } = options;
           this.cardno = cardno;
            if(!outtradeno) return;
            let t = setInterval(async ()=>{
                let rechargeResult = await checkRechargeReuslt({outtradeno});
                this.images='../../static/pay_success2.png';
                this.text="充值成功";
                this.title='充值成功';
                this.status = 1;
                clearInterval(t);
                console.log(`调试:检查充值返回`, rechargeResult)
            },1000)
        },
      methods:{
        handleToRechargeRecord(){
           uni.navigateTo({
             url:'../rechargeRecord/rechargeRecord?cardno='+this.cardno
           })
        },
        handleToHome(){
          uni.redirectTo({
            url:'../index/index'
          })
        }
      }
    }
</script>

<style scoped>

</style>
