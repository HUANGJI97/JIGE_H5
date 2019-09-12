<template>
     <view>
         <view class="pure_top padding">
             <view class="flex align-center ">
                 <view class="round padding-xl bg-gray"></view>

                 <view class="margin-left text-white ">
                     <view class="text-bold text-xl">王钢蛋</view>
                     <view class="margin-top-sm">
                         18757739042<text class="cuIcon cuIcon-settingsfill margin-left-xs"></text>

                     </view>
                 </view>
             </view>
             <view class=" flex justify-between text-sm" style="position: relative;bottom: -20px;">
                    <view class="bg-white padding radius-xxl flex-sub">
                        <view class="flex justify-center align-center text-bold ">
                            <view class="text-xxl " >0</view>
                            <view class="margin-left-xs">元</view>
                        </view>
                        <view class="flex align-center justify-center">
                            <view class="cuIcon cuIcon-redpacket_fill round text-blue bg-gray "></view>
                            <view class="margin-left-xs text-xs text-gray">可提现余额</view>
                            <view class="cuIcon cuIcon-right"></view>
                        </view>
                    </view>
                    <view class="bg-white padding radius-xxl flex-sub margin-left">
                        <view class="flex justify-center align-center text-bold ">
                            <view class="text-xxl " >0</view>
                            <view class="margin-left-xs">元</view>
                        </view>
                        <view class="flex align-center justify-center">
                            <view class="cuIcon cuIcon-ticket round text-blue bg-gray "></view>
                            <view class="margin-left-xs text-xs text-gray">我的粮票</view>
                            <view class="cuIcon cuIcon-right"></view>
                        </view>
                    </view>
             </view>

         </view>
         <view class="margin bg-white radius-xl padding text-df">
             <view class="text-bold">常用功能</view>
             <view class="flex margin-top-sm">
                <view class="text-center  padding-xs ">
                    <view class="cuIcon cuIcon-pay text-sl text-blue" style="font-size:45rpx;"></view>
                    <view class="text-xs margin-top-xs text-gray">粮票充值</view>
                </view>
                 <view class="text-center  padding-xs  margin-left-sm">
                     <view class="cuIcon cuIcon-creativefill text-sl text-orange" style="font-size:45rpx;"></view>
                     <view class="text-xs margin-top-xs text-gray">常见问题</view>
                 </view>
                 <view class="text-center  padding-xs  margin-left-sm">
                     <view class="cuIcon cuIcon-servicefill text-sl text-green" style="font-size:45rpx;"></view>
                     <view class="text-xs margin-top-xs text-gray">联系客服</view>
                 </view>
                 <view class="text-center  padding-xs  margin-left-sm">
                     <view class="cuIcon cuIcon-roundcheckfill text-sl text-red" style="font-size:45rpx;"></view>
                     <view class="text-xs margin-top-xs text-gray">一键签到</view>
                 </view>
             </view>
         </view>
     </view>

</template>

<script>
    export default {
        name: "home",
        data(){
            return {
              userInfo:{
                  nickname:'王钢蛋',
                  headimgurl:'http://thirdwx.qlogo.cn/mmopen/NiaudYqK5icH4uI7Q6nzPJNOtUKnb2ial3uAMQUf4iakyn5Tvt43Bqs6g3AShPzeyV8CrIfTLGibXoqtZYbBF4tLlaB90avXTYpAY/132',
                  times:'10'
              }
            }
        }
    }
</script>

<style scoped>
    .pure_top {
        width: 100%;
        position: relative;
        z-index: -1;
        height: 170px;
        overflow: hidden;
    }

    .pure_top::after {
        content: '';
        width: 140%;
        height: 120px;
        position: absolute;
        left: -20%;
        top: 0;
        z-index: -1;
        border-radius: 10% 10% 50% 50%;
        background: #1496f1;
    }
</style>
