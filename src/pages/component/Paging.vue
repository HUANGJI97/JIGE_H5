<template>
    <view class="flex justify-end" style="position: fixed;bottom: 10rpx;right: 10rpx;">
        <view class="text-center bg-black round shadow">
            <view class="cuIcon-fold cuIcon padding-sm" hover-class="text-blue " @tap="handlePrevPage"></view>
            <picker class="" @change="handlePagePickerChange" :value="cur" :range="pageRange">
                <view class="picker text-xs ">
                    <view class=" line-white">{{cur }}/{{max}}</view>
                </view>
            </picker>
            <view class="cuIcon cuIcon-unfold padding-sm" hover-class="text-blue " @tap="handleNextPage"></view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "Paging",
        data() {
            return {
                cur:1,
                max:0,
                pageRange:[]
            }
        },
        methods: {
            handleNextPage(){
                let max =this.max;
                if((this.cur + 1)>max){
                    this.cur = max;
                }else{
                    this.cur += 1;
                }

            },
            handlePrevPage(){
                if((this.cur - 1)<1){
                    this.cur = 1;
                }else{
                    this.cur -= 1;
                }
            },
            handlePagePickerChange(e) {
                this.cur = e.detail.value + 1
            },
        },
        computed:{
            // max:{
            //     get(){
            //         return this.total / this.size
            //     },
            //     set(val){
            //
            //     }
            // },
            // pageRange(){
            //     return Array.from(new Array(this.max).keys()).map(item=>{
            //         return item+1
            //     });
            // }
        },
        props:{
            total:{
                type:Number,
                default:0
            },
            size:{  //一页数据条数 默认10条
                type:Number,
                default: 10
            }
        },
        watch:{
            total:{
                handler(nv,ov){
                    console.log(`调试:监听到total值变化`, nv);
                    this.max = (nv / this.size).toFixed(0);
                    console.log(`调试:最大页数`, this.max);
                    this.pageRange = Array.from(new Array(108).keys()).map(item=>{
                             return item + 1
                    });
                    console.log(`调试:设置的pageRAnge`, this.pageRange)
                }
            },
            cur:{
                handler(nv,ov){
                    this.$emit('change',nv);
                    this.$emit('input',nv)
                }
            }
        }
    }
</script>

<style scoped>

</style>
