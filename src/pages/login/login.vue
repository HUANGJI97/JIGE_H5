<template>
    <view class="cu-page   ">
        <img src="../../static/haibao.jpg" style="height: 100%;width: 100%;">
    </view>

</template>

<script>
    import {getAccessToken, getMobile, Login} from "../../api/user";
    import { decodeParams } from "../../utils/utils"
    import cache from "../../utils/cache";


    export default {
        name: "login",
        data() {
            return {
                loading: false
            }
        },
        async onLoad(){
            let tokens = cache.get("tokens");
            let query = decodeParams(window.location.href);
            let {token,code,state,}  =query;


            console.log(`调试:获取缓存`, tokens);

            if(cache.get("X-Token")){
                if(token){
                    cache.set("token",token);
                }
                uni.reLaunch({
                    url:'../user/user'
                });
                return 0;
            }else if(code){
                let res = await getAccessToken({code,token:state});
                cache.set("token",state);
                uni.reLaunch({
                    url:'../user/user'
                });
                console.log(`调试:获取`, res);
                return 0;
            }else if(token){
                console.log(`调试不存在缓存正在调用登录:`);
                Login({token});
            }else{
                token = 'wx21bd29efec1e0b44';
                Login({token});
                // console.log(`调试:啥都没有 程序结束`,query,tokens)
            }

            //
            // if(code){
            //
            // }
            // if(!query.token){
            //     console.log(`调试:没有获取token程序结束`,query,window.location.href);
            //     return
            // }





        },
        methods: {
            handleLogin() {
                    // Login()
                uni.reLaunch({
                    url:'../index/index'
                })
            },
            async handleGetMobile(res) {
                let { detail } = res;
                let {encryptedData,iv }= detail;
                console.log(`调试:获取手机号调试`, encryptedData)
                await  getMobile({encryptedData,iv });

            },
            async handelGetUserInfo(res) {
                const { detail } = res;
                const { userInfo,encryptedData,iv } = detail;
                let token = await  Login();
                this.loading = false
                uni.redirectTo({
                    url: '../index/index'
                })

            }
        }
    }
</script>

<style scoped>
    .bg-milk {
        background-image: url("https://deepand.oss-cn-shenzhen.aliyuncs.com/image/bg-image-milk3.jpg");
        /*background-image:url("https://deepand.oss-cn-shenzhen.aliyuncs.com/image/bg-milk.jpg") ;*/
        /*background-image:url("https://deepand.oss-cn-shenzhen.aliyuncs.com/image/bg-image-milk.jpg") ;*/
        background-size: cover;
        /*background-color: #f4f5f0;*/
    }

    .bg-cow {
        background-image: url("https://deepand.oss-cn-shenzhen.aliyuncs.com/image/mow-huawen.jpeg");
        background-size: cover;
        /*color: white;*/
    }

    .footer {
        width: 70vw;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 40px;
        margin: 0 auto;
        /*bottom: 0px;*/
        /*left: 0px;*/
        /*right: 0px;*/
    }

    /*https://deepand.oss-cn-shenzhen.aliyuncs.com/image/mow-huawen.jpeg*/
</style>
