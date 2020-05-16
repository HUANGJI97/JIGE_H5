<template>
    <view class="radius-xxl padding-bottom"
          style="z-index: 99;height: 100vh;position:absolute;width: 100%;background-color: rgba(0,0,0,.5);" v-if="data ">
        <!--            <view class="bg-green" style="z-index:0;position: absolute;width: 100%;height:100%;top: 0;"></view>-->
        <view class="padding-sm bg-white text-df text-black text-bold"> {{data.name}}</view>
        <view class="padding-bottom  bg-white  " style="overflow: hidden;border-bottom-left-radius: 30rpx;border-bottom-right-radius: 30rpx;">
            <view class="flex justify-between padding-sm padding-right align-center "   v-for="(item,index) in data.items" :key="index" >
                <view class="title">{{item.name}}</view>
                <CheckButton v-model="item.value" v-if="item.type==='btn_radio'" :items="item.items"></CheckButton>
<!--                <CheckButton v-model="item.value" type="check" :items="item.items"></CheckButton>-->
                <Picker v-model="item.value" v-if="item.type === 'picker'" :items="item.items"></Picker>
                <input v-if="item.type==='input'" style="width: 400rpx;" class="bg-gray  round text-center text-sm" :placeholder="item.placeholder || ''"></input>
            </view>
<!--            <view class="flex justify-between padding-sm  ">-->
<!--                <view class="title">红包类型</view>-->
<!--                <picker :range="['品质联盟','拼手气','大礼包']">-->
<!--                    <view>品质联盟-->
<!--                        <text class="cuIcon-unfold cuIcon"></text>-->
<!--                    </view>-->
<!--                </picker>-->
<!--            </view>-->
        </view>
        <view class="padding-xl  " style="height: 50vh;" @tap="handleMaskTap"></view>

    </view>
</template>

<script>
    import CheckButton from "../from/CheckButton";
    import Picker from "../from/Picker";
    export default {
        name: "SearchCondition",
        components: {Picker, CheckButton},
        data(){
            return{
                show:true
            }
        },
        props:{
            data:{
                type:[Object,Boolean],
                default(){
                    return false;
                }
            },
            value:{
                type:Object,
                default:undefined
            }
        },
        methods:{
            handleMaskTap(){
                console.log(`调试:关闭`)
                this.$emit('close',true)
            }
        },
        watch:{
            data:{
                handler(nv,ov){
                    let result = {};
                    let value = nv.items.map(item=>{
                        result[item.key] = item.value;
                        return item
                    });
                    // console.log(`调试:监听到数据变化`, result);

                    this.$emit("input",result)
                },
                deep:true
            }
        }
    }
</script>

<style scoped>

</style>
