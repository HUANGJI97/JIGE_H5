<template>
    <view class="text-center   flex align-center justify-center bg-white" :style="`height: calc(100vh - ${0}px)`">
        <view>
            <image :src="image" style="width: 200rpx;height: 200rpx;"/>
            <view class="text-gray">
                <text class="margin-bottom"> {{text}}</text>
                <button v-for="(item,key) in buttons" :key="key" class="bg-green margin-top round" @click="handleButtonClick(item)">{{item.text}}</button>
<!--                <button v-if="status" class="bg-gray margin-top round" @tap="handleToHome">返回首页</button>-->
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "status",
        data(){
            return{

                StatusBar: this.StatusBar,
                CustomBar: this.CustomBar,
            }
        },
        props:{
            image:{
                type:String,
                default:'https://lft-ad.oss-cn-hangzhou.aliyuncs.com/eleme/png/icon-no-data.png'
            },
            text:{
                type:String,
                default: ''
            },
            buttons:{
                type:[Array,Object],
                default(){
                    return []
                }
            }
        },
        methods:{
            handleButtonClick(item){
                console.log(`调试:`, item)
                this.$emit('buttonTap',item);
                // item.click();
            }
        }
    }
</script>

<style scoped>

</style>
