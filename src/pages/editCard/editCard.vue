<template>
   <view>
       <cu-custom class="" :isBack="true">
           <block slot="content">卡操作</block>
       </cu-custom>
       <view class="cu-card">
           <view class="cu-form-group">
               <view class='title'>当前卡卡号</view>
               <input placeholder="输入限购金额" type="number" disabled v-model="cardInfo.cardno" class='radius ' name='input'></input>
               <button class="cu-btn sm  round bg-green shadow text-sm icon-uploa"  @tap="handleRplaceCard">我要换卡</button>
           </view>
           <view class="cu-form-group">
               <view class='title'>当前卡状态</view>
               <input  class='radius text-green' disabled="disabled"  :value="cardInfo.cardstatus" name='input'></input>
               <button class="cu-btn  sm round bg-green shadow text-sm icon-uploa"  :disabled="cardInfo.cardstatus != '正常'" @tap="handleLossCard">{{cardInfo.cardstatus == '正常' ? '我要挂失':cardInfo.cardstatus}}</button>
           </view>
           <view class="cu-form-group">
               <view class='title'>日限购金额</view>
               <input placeholder="输入限购金额" type="number" v-model="cardInfo.daylimitmoney" class='radius ' name='input'></input>
               <text class='cuIcon-moneybagfill text-red'></text>
           </view>
           <view class="cu-form-group">
               <view class='title'>日限购次数</view>
               <input placeholder="输入限购次数" type="number" v-model="cardInfo.daylimitcount" class='radius'  name='input'></input>
               <text class='cuIcon-usefullfill text-orange'></text>
           </view>

       </view>
<!--       <view class="flex bg-white text-center padding">-->
<!--           <view class="flex-sub">-->
<!--               <button class="cu-btn  bg-green shadow text-sm icon-uploa" @tap="handleLossCard">我要挂失</button>-->
<!--           </view>-->
<!--           <view class="flex-sub">-->
<!--               <button class="cu-btn  bg-green shadow text-sm icon-uploa" @tap="handleRplaceCard">我要换卡</button>-->
<!--           </view>-->
<!--       </view>-->
       <button class='cu-btn block bg-green lg margin-top-xl    cuIcon-file'  :disabled="submiting" :loading="submiting" @click="handleSubmitCardEdit"  >保存</button>
   </view>
</template>

<script>
    import {reportLossCard, setCardLimit} from "../../api/card";
   import {delay,comfirm} from "../../utils/utils";
   import cache from "../../utils/cache";

    export default {
        name: "editCard",
        data(){
            return {
                cardInfo:{},
                colorMap : { '正常':'bg-green','已挂失':'bg-orange','冻结':'bg-red'},
                submiting:false
            }
        },
        onLoad(options) {
            console.log(`调试:获取到参数`, options);
            this.cardInfo =  options
        },
        methods:{
            async handleSubmitCardEdit(){
                this.submiting = true;
                let res =await setCardLimit(this.cardInfo);
                this.submiting = false;
                uni.showToast({
                    title:'保存成功',
                });
                await  delay(1000);
                uni.navigateBack(-1);
                console.log(`调试:`, res)
            },
            handleRplaceCard(){
               uni.showModal({
                    title:'换卡',
                    content:'请联系客服',

               })
            },
            async handleLossCard({openid, cardno}){
              let comf = await  comfirm({
                    title:"挂失卡片",
                    content:`卡片挂失后将暂停使用 是否确认挂失卡(${this.cardInfo.cardname})[${this.cardInfo['cardno']}]`
               })
               if(comf){
                   let oepnid =  cache.get("token");
                   uni.showLoading({title:"挂失中..."});

                   let reuslt = await  reportLossCard({openid, cardno:this.cardInfo.cardno})
                   uni.hideLoading();
                   uni.showToast({
                       title:'成功'
                   })
                   this.cardInfo.cardstatus = "已挂失"
               }
            }

        }
    }
</script>

<style scoped>
    .footer{
        width: 80vw;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 40px;
        margin: 0 auto;
        /*bottom: 0px;*/
        /*left: 0px;*/
        /*right: 0px;*/
    }
</style>
