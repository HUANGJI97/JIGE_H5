<template>
    <view  style="width: 100%;height: 100vh;z-index: 99;top:0px;position: fixed; background-color: rgba(0,0,0,.5)" class="flex align-center justify-center" v-if="innerShow">
        <view style="width: 500rpx;">
<!--            <view class="bg-red flex justify-center  radius-xxxl position-relative" style="height: 140rpx;box-sizing: border-box;">-->
<!--                <view class="position-absolute " style="box-sizing: border-box;height: 140rpx;width:90%;bottom: 30rpx;background-image: url(https://deepand.oss-cn-shenzhen.aliyuncs.com/magex/2.3/images/bg-coupon_coin.png);background-size: 100% 100%;" >   </view>-->
<!--            </view>-->
            <view class="bg-red padding-sm   radius-xxxl">
                <view class="flex justify-center text-dark-gold  ">领取成功</view>
                <view class="text-gold text-xs text-center ">请打开饿了么App"我的-红包-店铺红包"查看</view>
                <view style="max-height: 350rpx;overflow-y: scroll;">
                    <view  v-for="(item,index) in data" :key="5" class="justify-between margin-top-sm text-gray radius-xl padding-sm flex" style="background-image: url(https://deepand.oss-cn-shenzhen.aliyuncs.com/magex/2.3/images/bg-coupon2.png);background-size: 100% 100%;">
                        <view class=" margin-left-sm">
                            <view class="text-red text-df">{{item.title}}</view>
                            <view class="text-sm margin-top-xs text-sm">
                              {{item.description}}
                            </view>
                        </view>
                        <view class="text-center flex align-center">
                            <view class="text-price text-red text-xxl margin-right">{{item.amount}}</view>
                            <!--                        <view class="text-sm  margin-top-xs">{{2}}</view>-->
                        </view>
                    </view>
                </view>
                <view class="flex justify-center margin-top ">
                    <button class="cu-btn padding-left-xl bg-gradual-gold text-sm round padding-right-xl" @tap="hideModel">老子知道了</button>
                </view>
            </view>
            <view></view>
            <view class="flex justify-center margin-top">
<!--                <view class="cuIcon-roundclose text-white  bg-gradual-orange" style="font-size:60rpx;" @tap="hideModel" ></view>-->
            </view>
        </view>

    </view>

</template>

<script>
    export default {
        name: "CouponModel",
        data(){
            return {
                innerShow:true,
                data:[]
            }
        },
       async  created(){
            console.log(`调试:组件加载成功`);
            // if(this.auto){
            //     console.log(`调试:获取到优惠券信息`, activity)
            //
            // }


       },
        props:{
            activiData:{
                type:Array,
                default() {
                    return undefined;
                }

            },
            auto:{
                type:Boolean,
                default:false
            }
        },
        watch:{
            activiData:{
                handler(nv,ov){
                    console.log(`调试:优惠券内部数据发生变化`, nv);
                    this.data= nv;
                    this.innerShow =this.data.length
                },
                deep:true,
                immediate: true  // 这句重要

            }
        },
        methods:{
            hideModel(){
                this.innerShow = false
            },
            handleUserCoupon(){
                this.$emit("userCoupon",this.data)
            }
        }
    }
</script>

<style scoped>
    .bg-gradual-gold{
         background-image: linear-gradient(45deg, #f8f8d4, #fcd18e);
        color: #6e4a0f;
    }
    .text-gold{
        color: #f8f8d4;
    }
    .text-dark-gold{
        color:#fcd18e;
    }

</style>
