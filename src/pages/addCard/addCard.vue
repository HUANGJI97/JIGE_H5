<template>
   <view>
       <cu-custom class="" :isBack="true">
           <block slot="content">添加卡片</block>
       </cu-custom>
       <view class="cu-card">
           <view class="cu-form-group">
               <view class='title'>卡号</view>
               <input placeholder="请输入卡号" v-model="cardno"  type="number" class='radius' name='input' @input="handleCardnoCahnge"></input>
               <text class='cuIcon-card text-gray'></text>
           </view>
           <view class="cu-form-group">
               <view class='title'>学校</view>
               <input placeholder="请输入卡号自动识别" v-model="school" class='radius' disabled="disabled" name='input'></input>
               <text class='cuIcon-group_fill text-gray'></text>
           </view>
       </view>
       <button class='cu-btn block bg-green lg  margin-top-xl cuIcon-add'  @click="handleSubmit" :disabled="submiting" :loading="submiting"  >绑定</button>
   </view>
</template>

<script>
    import {addCard, getSchoolNameByCard} from "../../api/card";
  import {delay} from "../../utils/utils";

    export default {
        name: "addCard",
        data(){
            return{
                submiting:false,
                cardno:'',
                school:'',
            }
        },
        methods:{
            async handleSubmit(){
                console.log(`调试:当前卡号`,this.cardno);
                if(this.school && this.school !== ''){
                    this.submiting = true;
                    let result = await  addCard({cardno:this.cardno}).catch(err=>{
                        uni.hideLoading();
                        uni.showToast({title:'添加失败'})
                        console.log(`调试:添加失败`, err)
                    });
                    this.submiting = false;
                    uni.showToast({
                        title:'绑定成功'
                    })
                    await  delay(1000);
                    console.log(`调试:绑定成功`, this.result)
                    uni.navigateBack(-1);
                }else{
                    uni.showToast({
                        title:'卡号不正确',
                        icon:'none'
                    })
                }
            },
            async handleCardnoCahnge(){
                console.log(`调试:当前卡号`,this.cardno,this.cardno.length);
                if(this.cardno.length === 10){
                   this.school =  await  getSchoolNameByCard({cardno:this.cardno}).catch(res=>{
                       this.school =''
                   })
                    console.log(`调试:获取到的校名`, this.school)
                }else{
                    this.school = ''
                }

            }
        }
    }
</script>

<style scoped>
    .footer{
        width: 70vw;
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
