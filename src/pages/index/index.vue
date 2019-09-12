<template name="basics">
   <page :tabbar="tabbarOption" show-tabbar>
        <home></home>
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

    const utils = require("../../utils/utils")

    export default {
        components: {Home, User, Status, Page, Modal},
        data() {
            return {
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
                            icon: 'cuIcon-redpacket bg-red',
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
