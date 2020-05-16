<template name="basics">
   <page :tabbar="tabbarOption" show-tabbar @onTabbarActionTap="handleActionTap">
        <home></home>
       <coupon-model :activi-data="data" v-if="data.length"  ></coupon-model>
   </page>
</template>

<script>
    import {truncate} from 'fs';
    import Modal from "../component/modal";
    import {getCardInfo, getCardList, getOpenid, unLinkCard, updateCardName} from "../../api/card";
    import Page from "../component/page/page";
    import Status from "../component/status";
    import User from "../user/user";
    import Home from "./home";
    import {getGiftPackge} from "../../api/user";
    import CouponModel from "../component/CouponModal";

    const utils = require("../../utils/utils");

    export default {
        components: {CouponModel, Home, User, Status, Page, Modal},
        data() {
            return {
                data:[],
                tabbarOption:{
                    index: 0,
                    pages: [
                        {
                            key: 'home',
                            title: '功能',
                            type: 'page',
                            icon: 'emojiflashfill',
                        }, {
                            key: 'scan',
                            title: '一键领取',
                            loadding:false,
                            disable:false,
                            type: 'button',
                            icon: ' bg-red cuIcon-redpacket ',
                        }, {
                            key: 'user',
                            title: '我的',
                            type: 'page',
                            icon: 'myfill',
                        }
                    ]
                }
            }
        },
        async onLoad() {

            // this.elements[1]['name']=cards[0]['recharge'];

        },
        async onShow(){
            // return 0;
            // this.cardInfo = await  getCardInfo({cardno:this.cardInfo['cardno']});
            //
            // this.elements[1]['name'] = this.cardInfo['lastrecharge']['date'];
        },

        methods: {
           async  handleActionTap(item){
                console.log(`调试:你点击了领取红包`, item);
                item.title="请稍后 ";
                item.loadding = true;
                try {
                    let res =  await  getGiftPackge();
                    this.data = res.data;
                    item.loadding = false;
                    item.title= "一键领取";
                }catch (e) {
                    uni.showToast({
                        title:e.error.msg,
                        icon:'none'
                    });
                    item.loadding = false;
                    item.title= "一键领取";
                    console.log(`调试:红包领取失败`, e)
                }


               // setTimeout(()=>{
               //     // let data =[
               //     //     {
               //     //         "amount": 3.0,
               //     //         "description": "满¥30.0可用",
               //     //         "title": "平台通用红包",
               //     //         "type": 10,
               //     //         "remarks": "2019-10-19到期"
               //     //     },
               //     //     {
               //     //         "amount": 4.0,
               //     //         "description": "满¥30.0可用",
               //     //         "title": "下午茶红包",
               //     //         "type": 11,
               //     //         "remarks": "2019-10-19到期"
               //     //     }]
               //     // this.data = data;
               //
               //
               // },2000);



               // item.loading =false;
                // console.log(`调试:领取红包返回值`, res)
            },
            handleButtonTap({key}){
                // console.log(`调试:`, e)
                if(key === 'add_card'){
                    this.handleAddCard();
                }

            }
        }
    };
</script>

<style>
    .header-data {
        /* margin-top: 39vh; */
    }

    .header_bg {
        width: 100%;
        height: 40vh;
        background-image: url(https://cdn.nlark.com/yuque/0/2019/png/280374/1552996358228-assets/web-upload/e256b4ce-d9a4-488b-8da2-032747213982.png);
        background-size: 100% 100%;
        background-color: white;
        position: absolute;

        top: 0px;
        z-index: 9;
    }

    .page {
    }

    .response {
        height: 50vh;
    }

</style>
