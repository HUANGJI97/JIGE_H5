<template>
    <view class="cu-modal" :class="show?'show':''" >
        <view class="cu-dialog" :style="{backgroundColor:bgColor === 'none'?`rgba(0,0,0,0)`:''}">
            <view class="drawer-modal-button flex justify-end bg-red" v-if="showExternalCloseButton"  >
                <view class="cuIcon-refresh text-white text-xl margin-right " @click="handleRefresh"></view>
                <view class="cuIcon-close text-white text-xl margin-right " @click="hideModal"></view>
            </view>
            <view :class="`cu-bar ${bgColor === `none`? ``:bgColor} justify-end`" v-if="!hideHeader">
                <view class='content'>{{title}}</view>
                <view class='action' @click='hideModal'>
                    <text class='cuIcon-close text-white'></text>
                </view>
            </view>
            <view :class='`padding-xl ${bgColor ===`none` ? ``:bgColor}`'>
                <slot></slot>
            </view>

            <view class="cu-bar " v-if="!hideFooter">
                <view class='action margin-0 flex-sub text-green ' @click='hideModal'>
                    <view class='action margin-0 flex-sub  ' @click='onConfirm'>确定</view>
                    <view class='action margin-0 flex-sub text-gray solid-left' @click='onCancel'>取消</view>
                </view>
            </view>
            <view v-else>
                <slot name="footer"></slot>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "modal",
        data(){
            return{
                show:false
            }
        },
        props:{
           title:{
               type:String,
               default:'标题'
           },
           value:{
               type:Boolean,
               default: false
           },
            hideHeader:{
                type:Boolean,
                default: false
            },
            hideFooter:{
                type:Boolean,
                default: false
            },
            showExternalCloseButton:{
                type:Boolean,
                default: false
            },

            bgColor:{
               type:String,
                default:'bg-white'
            }
        },
        computed:{

        },
        watch:{
            value(val){
                this.show = val
            }
        },
        methods:{
            hideModal(){
                this.show = false;
                this.$emit("input",this.show)
            },
            handleRefresh(){
                this.$emit("onRefresh")
            },
            onConfirm(){
                this.$emit('onConfirm')
            },
            onCancel(){
                this.$emit('onCancel')
            }

        }
    }
</script>

<style scoped>
.drawer-modal-button{
    /*position: absolute;*/
    /*top: -10px;*/
}
</style>
