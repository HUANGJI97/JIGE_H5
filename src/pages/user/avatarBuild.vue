<template>
 <view class="bg-page ">
     <uploader></uploader>
     <view class="flex justify-center" style="padding-top:350rpx;">
       <view class="text-center">
          <view class="justify-center flex">
              <view class="bg-gray avatar_box radius-xxl">
                   <view class="avatar_box_border "></view>
                  <view class="avatar_image " :style="'width: 100%;height: 100%; background-image: url('+userInfo.headimgurl+')'"></view>

                  <!--                  111-->

              </view>
          </view>
           <button @tap="handleShowModel" class="cu-btn  bg-gold-gradient shadow-gold padding round btn-save margin-top-xl text-xl text-bold text-brown" hover-class="shadow-gold-sm text-sm"> 点击保存</button>
       </view>
     </view>
     <view class="text-blue footer flex justify-center text-gold" @tap="handleShowFllow">
         <view class="text-center text-xs text-glod"><text  style="text-decoration: underline;">关注鸡哥</text> <br>发现更多有趣功能</view>
     </view>
     <modal hide-footer   v-model="showModel" title="保存图片"  bg-color="bg-china-red" >
         <view>
             <img class="radius-xl" style="width: 300rpx;height: 300rpx;" :src=" BASE_URL +'/jige/build_avatar?src='+userInfo.headimgurl">

         </view>
         <view class="margin-top">
             长按保存图片
         </view>
     </modal>
     <modal hide-footer   v-model="showFllow" title="关注鸡哥"  bg-color="bg-white" >
         <view>
             <img class="radius-xl" style="width: 300rpx;height: 300rpx;" src="https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81-%E5%9B%BD%E5%BA%86%E7%89%88.jpg">

         </view>
         <view class="margin-top">
             长按识别二维码
         </view>
     </modal>
 </view>

</template>

<script>
    import Page from "../component/page/page";
    import Modal from "../component/modal";
    import { decodeParams } from "../../utils/utils"
    import {
        checkSignin,
        getExtensionCode,
        getExtensionUser, getMpConfig,
        getNotice,
        getUserInfo,
        Login,
        signin
    } from "../../api/user";
    import cache from "../../utils/cache";
    import Uploader from "../component/uploader/uploader";
    export default {
        name: "user",
        components: {Uploader, Modal, Page},
        data(){
            return {
                showModel:false,
                showFllow:false,
                config:{},
                BASE_URL:this.BASE_URL,
                modelKefu:false,
                unreadNoticeCount:0,
                modelEx:false,
                exinfo:{},
                userInfo:{},
                exCode:null,
                signInfo:{
                    signed:true
                }
            }
        },

       async onLoad(options){
           console.log(`调试:获取到token`, options);
           cache.del("redirect");
           let tokens = cache.get("tokens");
           let xToken = cache.get("X-Token");
           let token =  cache.get("token");
           if(xToken){
               // let { access_token,openid } = tokens;

               let userInfo = await  getUserInfo();
               this.userInfo =userInfo;
               // let buildAvatar = await  buildAvatar()

           }else{
               cache.set('redirect','../user/avatarBuild');
               Login({token})
           }

        },
        created(options){
            // console.log(`调试:create->options`, options)
        },
        methods:{
            handleShowModel() {
                this.showModel = true
            },
            handleShowFllow(){
                this.showFllow= true
            }
        }
    }
</script>

<style scoped>
    .footer{
        position: fixed;
        bottom: 0px;
        width: 100%;
    }
.header{
    width: 100%;
    height: 320rpx;
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg_head.png");
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-head-night2.png");
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-head_1001_2.png");
    background-size: 100% 100%;
}
.avatar_box{
    border: 10rpx solid #f7e4ba;
    width: 250rpx;
    height: 250rpx;
    position: relative;

}
.text-glod{
    color: #feeb83;
    text-shadow: 1px 1px 1px #644109;
}
.avatar_box_border{
    width: 100%;
    height: 100%;
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-avatar_build.png");
    /*background-color: red;*/
    background-size: 100% 100%;
    z-index: 5;
    position: absolute;
}
.bg-gold-gradient{
    background: linear-gradient(45deg, #fede27, #feeb83);
}
.shadow-gold{
    box-shadow: 0px 3px 0px #ed8e2a;;

}
.shadow-gold-sm{
    box-shadow: 0px 2px 0px #ed8e2a;;

}
.btn-save{
    width: 300rpx;
}
 .bg-page{
     background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg_build_avatar.png");
     background-size: 100% 100%;
     height: 100vh;
 }
    .bg-avatar{
        width: 90%;
        height: 230rpx;
        background: white;
        position: relative;
        background-image: url("../../static/bg_info.png");
        background-size: 100% 100%;
        top: 180rpx;
        box-shadow: 1px 1px 3px #022b777d;
        border-radius: 10px;

    }
    .bg-night{
        background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-btn-night.png");
        background-size: 100% 100%;
        color: white;
    }
    .bg-china-red{
        background-color: #d84830;
        color: #fff9f1;
    }
    .bg-night[disabled]{
        color: white !important;


    }


.bg-cash{
        background-image: url("../../static/cash_yellow.png");
        background-size: 100% 100%;
        width: 80rpx;
        height: 45rpx;
    }
    .bg-cash-sm{
        background-image: url("../../static/cash_yellow.png");
        background-size: 100% 100%;
        width: 60rpx;
        height: 35rpx;
        display: inline-block;
    }
    .text-blance{
        color: black;
        font-weight: bold;
        font-size: 60rpx;

    }
/*    底部抽屉*/
    .drawer-modal{
        /*background: white;*/
        position:absolute;
        z-index: 99;
        bottom: 0px;
        width: 100%;
    }
    .drawer-modal-mask{
        background-color:rgba(0,0,0,0.7);
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 98;
        top: 0;
    }
    .drawer-modal-content{
        border-top-left-radius: 50rpx;
        border-top-right-radius: 50rpx;
    }
</style>
