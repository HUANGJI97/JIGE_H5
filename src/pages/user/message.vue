<template>
    <view>
        <status v-if="!list.length" text="暂无消息"></status>
        <view class="margin">
            <view v-for="(item,index) in list"  :key="index" class="flex bg-white margin-top-sm padding radius-xxl justify-between" @tap="handleShowDetaile(item)" >
                <view class="flex ">
                    <view class="flex align-center">
                        <view class="cu-avatar round lg" style="background-image:url(../../static/notice_icon.png);">
                        </view>
                    </view>
                    <view class='content margin-left-sm '>
                        <view class='text-grey'>{{item.title}}
                            <!--                    <view class="cu-tag round bg-orange sm">c</view>-->
                        </view>
                        <view class='text-gray text-sm margin-top-sm' style="overflow: hidden;text-overflow:ellipsis;">
                            <text class='cuIcon-redpacket_fill text-red' v-if="item.type==='coin' && !item.get_status"></text>{{item.remark}}
                        </view>
                    </view>
                </view>
                <view >
                    <view class="text-xs text-gray  flex justify-end">{{item.created_at}}</view>
                    <view class="flex justify-end margin-top-sm">
                        <view class="cu-tag sm round text-xxxs   margin-top-sm " :class="['bg-red','bg-green'][item.read_status]">{{['未读','已读'][item.read_status]}}</view>
                    </view>
                </view>
            </view>
            <modal v-model="detaileModelVisible" hide-footer :title="curentNotice.title">
                <view v-html="curentNotice.content"></view>
                <view slot="footer">
                    <view class="flex bg-white justify-center padding-sm">
                        <button class="cu-btn round " :class="curentNotice.coin ? 'bg-green' : 'bg-blue'" @tap="handleButtonClick"  :disabled="curentNotice.type === 'coin' &&  curentNotice.get_status != 0">{{curentNotice.coin ?(curentNotice.get_status?'已领取':'领取'):'知道了'}}</button>
                    </view>
                </view>
            </modal>
        </view>
    </view>
</template>

<script>
    import {getNotice, getNoticeCoin, readNotice} from "../../api/user";
    import Modal from "../component/modal";
    import Status from "../component/status";

    export default {
        name: "message",
        components: {Status, Modal},
        data(){
            return {
                list:[],
                curentNotice:{},
                detaileModelVisible:false,
            }
        },
        async onLoad(){
            uni.showLoading({
                title:'请稍后'
            })
            let notices = await  getNotice();
            this.list = notices.list
            uni.hideLoading();
        },
        methods:{
           async  handleShowDetaile(item){
                this.curentNotice =item;
                if(item.read_status == 0){
                    let res= await readNotice({id:item.id});
                    item.read_status = 1;
                }
                this.detaileModelVisible = true
            },
            async handleButtonClick(){
               let {coin,type,id} = this.curentNotice;
                if(type==='coin'){
                    let res= await getNoticeCoin({id}).catch(err=>{
                        uni.showToast({
                            title:'领取失败',
                            icon:'none'
                        })
                        throw  err;
                    });
                    if(res){
                        console.log(`调试:领取成功`, res);

                        uni.showToast({
                            title:'领取成功'
                        })
                        this.curentNotice.get_status=1;
                    }
                }
            }

        }
    }
</script>

<style scoped>

</style>
