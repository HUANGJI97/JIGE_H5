<template>
<page hide-title-bar=""  bg-color="#f2f7fa">
    <CouponModel v-if="logid" :activi-data="logData" ></CouponModel>
    <view class="header flex justify-center ">
        <view class="flex justify-end  padding" style="position: fixed;top: 0; width: 100vw;">
            <view class="cuIcon cuIcon-rankfill text-white padding-xs" style="position: relative;font-size: 50rpx;" @tap="handleToRankingList">
            </view>
            <view class="cuIcon cuIcon-message text-white padding-xs" style="position: relative;font-weight:10;font-size: 50rpx;" @tap="handleToMessage">
                <view class="cu-tag badge" v-if="unreadNoticeCount">{{unreadNoticeCount}} </view>
            </view>
        </view>
        <view class="bg-avatar shadow shadow-blur padding">
            <view class="flex justify-between margin-top-xs">
               <view>
                   <view class="flex align-center">
                       <view class="sm cu-avatar round" :style="'background-image: url('+userInfo.headimgurl+')'"></view>
                       <view class="margin-left-sm">{{userInfo.nickname}}</view>
                   </view>
                   <view>
                       <view class="flex align-end">
                           <view class="bg-cash margin-bottom-xs"></view>
                           <view class="text-blance margin-left-sm">{{userInfo.times}}</view>
                       </view>
                       <view class="text-sm text-gray margin-top-xs" @click="handleToRechargeRecord">
                           充值记录
                           <text class="cuIcon-right"></text>
                       </view>
                   </view>
               </view>
                <view class=" flex align-center ">
                    <button class="cu-btn bg-china-red round" @click="handleToRecharge">
                        粮票充值
                    </button>
                </view>
            </view>
        </view>
    </view>
    <view class="margin-top-xl padding " style="margin-top: 100rpx;height: 66vh;overflow-y: scroll;padding-bottom: 0px;">
            <view class="text-bold">免费获取更多粮票</view>

            <view class="flex justify-between bg-white padding radius margin-top align-center">
                <view class="flex align-center">
                    <view class="text-center">
                        <view class="text-xxl text-black text-bold">+{{config.ex_coin}}</view>
                        <view class="bg-cash-sm margin-top-xs" ></view>
                    </view>
                    <view class="margin-left">
                        <view class="text-black text-md">邀请好友</view>
                        <view class="text-sm text-gray" style="max-width: 350rpx;">每邀请1名好友,即可获得{{config.ex_coin}}张粮票奖励</view>
                        <view class="margin-top-xs flex">
                            <view class="cu-avatar-group">
                                <view v-for="(item,index) in exinfo.list" :key="index" class="cu-avatar round sm" :style="'background-image: url('+item.headimgurl+')'"></view>
                            </view>
                            <view class="text-sm text-blue margin-top-xs" @click="handleToExRecord">
                                已邀请{{exinfo.total}}人
                                <text class="cuIcon-right"></text>
                            </view>
                        </view>
                    </view>
                </view>
                <view>
                    <button class="cu-btn sm bg-china-red round" @click="handleToEx">
                        去邀请
                    </button>
                </view>
            </view>


            <view class="flex justify-between bg-white padding radius margin-top align-center" v-if="false">
                <view class="flex align-center">
                    <view class="text-center">
                        <view class="text-xl text-black text-bold">+N</view>
                        <view class="bg-cash-sm margin-top-xs" ></view>
                    </view>
                    <view class="margin-left">
                        <view class="text-black text-md">每周打榜</view>
                        <view class="text-sm text-gray" style="max-width: 350rpx;">每周打榜</view>
                    </view>
                </view>
                <view>
                    <button class="cu-btn sm bg-china-red    round" @click="handleToRankingList" >
                        去打榜
                    </button>
                </view>
            </view>

            <view class="flex justify-between bg-white padding radius margin-top align-center">
                <view class="flex align-center">
                    <view class="text-center">
                        <view class="text-xxl text-black text-bold">+{{config.sign_coin}}</view>
                        <view class="bg-cash-sm margin-top-xs" ></view>
                    </view>
                    <view class="margin-left">
                        <view class="text-black  text-md">每日签到</view>
                        <view class="text-sm text-gray" style="max-width: 350rpx;">每日签到，每日签到可获取2粮票</view>
                    </view>
                </view>
                <view>
                    <button class="cu-btn sm bg-china-red round" :disabled="signInfo.signed" @click="handleSign">
                        {{signInfo.signed?'已签到':'去签到'}}
                    </button>
                </view>
            </view>


            <view class="flex justify-between bg-white padding radius margin-top align-center" >
                <view class="flex align-center">
                    <view class="text-center">
                        <view class="text-xl text-black text-bold">+{{config.add_coin}}</view>
                        <view class="bg-cash-sm margin-top-xs" ></view>
                    </view>
                    <view class="margin-left">
                        <view class="text-black text-md">添加客服微信</view>
                        <view class="text-sm text-gray" style="max-width: 350rpx;">添加客服为好友,可额外获得{{config.add_coin}}枚粮票奖励</view>
                    </view>
                </view>
                <view>
                    <button :disabled="userInfo.added" class="cu-btn sm bg-china-red round" @click="modelKefu = true">
                        {{userInfo.added?'已完成':'去完成'}}
                    </button>
                </view>
            </view>




    </view>


    <view v-if="modelKefu" class="drawer-modal-mask"></view>
    <view v-if="modelKefu" class="drawer-modal">
        <view class="drawer-modal-button flex justify-end">
            <view class="cuIcon-close text-white text-xl margin-right margin-bottom" @click="modelKefu = false"></view>
        </view>
       <view class="drawer-modal-content bg-white padding ">
            <view class="text-center margin-bottom">
                <view class="margin-top">长按识别下方二维码</view>
                <view>添加客服微信号，即可领取奖励</view>
                <image class="margin-top" src="../../static/kefu.png" style="height: 400rpx;width: 400rpx;"></image>
            </view>
       </view>
    </view>

     <modal v-model="modelEx" hide-footer hide-header bg-color="none"  @onRefresh="handleRefresh" >
        <img :src="exCode || `../../static/hongbao.png`" style="width: 100%;" class="radius-xl"/>
        <view class="bg-white round padding-xs margin-top-xs " style="">长按分享图片给好友或者保存吧</view>
     </modal>

</page>

</template>

<script>
    import Page from "../component/page/page";
    import Modal from "../component/modal";
    import { decodeParams } from "../../utils/utils"
    import {
        checkSignin,
        getExtensionCode,
        getExtensionUser, getLogDetaile, getMpConfig,
        getNotice,
        getUserInfo,
        Login,
        signin
    } from "../../api/user";
    import cache from "../../utils/cache";
    import CouponModel from "../component/CouponModal";
    export default {
        name: "user",
        components: {CouponModel, Modal, Page},
        data(){
            return {
                config:{},
                modelKefu:false,
                logData:[],
                unreadNoticeCount:0,
                modelEx:false,
                logid:undefined,
                exinfo:{},
                userInfo:{},
                exCode:null,
                signInfo:{
                    signed:true
                }
            }
        },

       async onLoad(options){
           console.log(`调试:获取到options`, options);

            this.loadData();
           this.logid=options.logid;
           let logDetaile = await getLogDetaile({id:this.logid});
           this.logData = logDetaile.data.sn;
           console.log(`调试:当前 logid`,this.logData )



        },
        created(options){
            // console.log(`调试:create->options`, options)
            this.loadData();
        },
        methods:{
            async handleRefresh(){
                console.log(`调试:触发刷新`,);
                cache.del('exCode');
                uni.showLoading({title:'获取中'});
                await this.handleToEx();
                uni.showToast({title:'刷新成功'});
            },
            async loadData(){
                let token =  cache.get("token");
                // cache.set("token",token);
                uni.showLoading({
                    title:'loading',
                });
                let tokens = cache.get("tokens");
                let xToken = cache.get("X-Token");
                if(xToken){
                    try {
                        let { access_token,openid } = tokens;
                        this.userInfo  = await getUserInfo({access_token,token,openid});
                        let config = await getMpConfig();
                        this.config= config;
                        console.log(`调试:获取到系统配置`, config);


                            this.signInfo = await  checkSignin();
                        console.log(`调试:获取到的签到信息`, this.signInfo);

                        this.exinfo = await  getExtensionUser({page:1,size:5});
                        // this.exinfo =exinfo
                        // console.log(`调试:获取到推广用户信息`, exinfo)
                        uni.hideLoading();

                        let notice = await  getNotice({status:0});
                        this.unreadNoticeCount = notice.list.length;
                        console.log(`调试:获取到通知信息`, notice)

                    }catch (e) {
                        console.log(`调试:出错`, e);
                        uni.hideLoading();
                    }
                }else{
                    console.log(`调试:没有Xtoken 重新调用登录`);
                    Login({token})
                }

            },
            handleToRecharge(){
                uni.navigateTo({
                    url:'../recharge/recharge'
                })
            },
            handleToRechargeRecord(){
                uni.navigateTo({
                    url:'../rechargeRecord/rechargeRecord'
                })
            },
            handleToExRecord(){
                uni.navigateTo({
                    url:'../consumeRecord/consumeRecord'
                })
            },
            handleToRankingList(){
                uni.navigateTo({
                    url:'../rankingList/rankingList'
                })
            },
            async handleToEx(){
                uni.showLoading({title:'获取中'});
              let res = await getExtensionCode().catch(res=>{
                  uni.hideLoading();
              });
              uni.hideLoading();
              this.modelEx = true;
              this.exCode =res;
              return  true;
            },
            handleToMessage(){
                // uni.showToast({title:'Developing...',icon:'none'});
                // return 0;
              uni.navigateTo({
                  url:'./message'
              })
            },
            async handleSign(){
                 if(!this.signInfo.signed){
                      try {
                          uni.showLoading({title:'签到中'});
                           let result = await  signin();
                           uni.hideLoading();
                           this.loadData();
                           uni.showModal({
                               title:'签到成功',
                               content:`您已成功签到 粮票+${result.addCoin}`,
                               showCancel:false
                           });
                           console.log(`调试:签到返回值`,result)
                      }catch ({error}) {
                          uni.hideLoading();
                          uni.showToast({
                              title:error.msg || '签到失败',
                              icon:'none'
                          })
                      }
                 }
            }
        }
    }
</script>

<style scoped>
.header{
    width: 100%;
    height: 320rpx;
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg_head.png");
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-head-night2.png");
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-head_1001.png");
    background-image: url("https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/bg-head_1001_6.png");
    background-size: 100% 100%;
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
