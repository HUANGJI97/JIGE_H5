<template>
  <view class=" flex justify-center padding" style="height: 100vh;" :class="modeColor[mode] || 'bg-gradual-blue'" v-if="isMobie">
     <view class="game_boy" >
           <view class="display_warp">
              <div class="display " ref="display">
                  <view class="cu-load loading" v-if="loading">

                  </view>
                 <view v-if="toastShow" class="flex justify-center">
                     <view class="flex padding">
                         <view :class="'cuIcon cuIcon-'+toastIcon+''"></view>
                         <text>{{toastText}}</text>
                     </view>
                 </view>
                  <view v-if="showMenu">
                      <view class="padding-xs" :class="active === index ? 'bg-black': ''" v-for="(item,index) in menus">
                         {{index+1}}.{{item.name}}
                      </view>
                  </view>
                  <view v-else v-html="content">

                  </view>
              </div>
           </view>
         <view class="flex justify-between align-center"style="margin-top: 200rpx;">
             <view class="button_area">
                 <view class="direction_button">
                     <view class="direction_btn direction_up" hover-class="direction_click" @click="handleDireClick('up')"></view>
                     <view class="" style="margin: -4px !important;padding: 0px;">
                         <view class="direction_btn direction_left" hover-class="direction_click" @click="handleDireClick('left')"></view>
                         <view class="direction_btn direction_center" hover-class="direction_click" @click="handleDireClick">
                             <view class="direction_center_cirle"></view>
                         </view>
                         <view class="direction_btn direction_right" hover-class="direction_click" @click="handleDireClick('right')"></view>
                     </view>
                     <view class="direction_btn direction_down" hover-class="direction_click" @click="handleDireClick('down')"></view>
                 </view>
             </view>
             <view class="control_button">
                    <view class="control_btn" hover-class="control_btn_hover" @click="handleDireClick('A')">A</view>
                    <view class="control_btn"   hover-class="control_btn_hover" @click="handleDireClick('B')">B</view>
             </view>

         </view>


         <view class="menu_button  flex ">
            <view class="flex" style="margin-left: 130rpx;">
                <view class="menu_btn_warp">
                    <view class="menu_btn"  hover-class="menu_btn_hover" @click="handleDireClick('SELECT')"></view>
                    <view class="menu_btn_text"  >SELECT</view>
                </view>
                <view class="menu_btn_warp">
                    <view class="menu_btn" hover-class="menu_btn_hover" @click="handleDireClick('START')"></view>
                    <view class="menu_btn_text" >START</view>
                </view>
            </view>
         </view>

     </view>

  </view>
  <view v-else>
      <h1>用手机浏览器打开啊 孤儿！NMSL</h1>
  </view>
</template>

<script>

    import {getNMSL, pullNMSL} from "../../api/user";
    import {isMobile} from  "../../utils/utils"


    export default {
        name: "nmsl",
        data(){
            return {
                active:0,
                nmsl:{},
                modeColor:{
                  'ktff':'bg-gradual-green',
                  'sclh':'bg-gradual-orange',
                  'chp':'bg-gradual-red',
                },
                showMenu:true,
                toastShow:false,
                isMobie:false,
                toastIcon:'roundcheckfill',
                toastText:'成功',
                mode:'',
                content:false,
                loading:false,
                timer:null,
                menus:[
                    {
                        name:"口吐芬芳",
                        key:'ktff',
                    },
                    {
                        name:"舌灿莲花",
                        key:'sclh',
                    },
                    {
                        name:"彩虹屁",
                        key:'chp',
                    },
                    {
                        name:"帮助",
                        key:'help',
                    },


                ]
            }
        },
       async  onLoad(){
            document.title="口吐芬芳2.0"
           this.isMobie = isMobile();
            // let nmsl = await getNMSL()
            // console.log(`调试:`, nmsl)
        },
        methods:{

           async  handleDireClick(e){
                // navigator.vibrate([500,300,400,300]);
                console.log(`调试:`, e);
                uni.vibrateShort({
                    success(res){},
                    fail(err){
                        console.error(`错误:`, err)
                    }
                });
                let display = this.$refs.display;

                switch (e) {
                    case "up":
                        if(this.active-1<0){
                            this.active = this.menus.length -1

                        }else{
                            this.active -=1;
                        }

                    break;
                    case "down":
                        if(this.active+1 >= this.menus.length){
                            this.active = 0
                        }else{
                            this.active +=1;
                        }



                   break;
                    case "left":
                        break;
                    case "right":
                        if(this.mode==='ktff' || this.mode==='sclh' || this.mode==='chp'){
                            await  this.getNMSL(this.mode);
                        }
                    break;
                    case "A":
                        console.log(`调试:当前选择`, this.menus[this.active]);
                        this.mode =  this.menus[this.active].key;
                        switch (this.menus[this.active].key) {
                            case "help":
                                let content = `操作说明:<br>方向键上下切换菜单 左右可切换上下条图片 A键确认 B键返回 SELECT键可复制纯文字  长按图片可保存或发送给好友
                                               <br>模式说明:
                                                <br>口吐芬芳->屏蔽双亲 生殖器等字词 较为缓和 初级使用
                                                <br>舌灿莲花->火力全开
                                                <br>彩虹屁->有点类似土味情话
                                              `;
                                this.showContent(`<div class="padding-xs" style="line-height: 25px;">${content}</div>`);
                            break;
                            case "ktff":
                                this.showContent('');
                               await  this.getNMSL('ktff');
                            break;
                            case "chp":
                                this.showContent('');
                                await  this.getNMSL('chp');
                             break;
                            case "sclh":
                                this.showContent('');
                                await  this.getNMSL('sclh');
                                break;
                            case "pachong":
                                this.pachong();
                            break;
                            default:
                                this.showToast({title:'暂未开放',type:'fail'});
                                break;
                        }

                    break;
                    case "B":
                        this.showMenu = true;
                        this.mode='';
                    break;
                    case "SELECT":
                        if(this.mode!==''){
                            uni.setClipboardData({
                                data:this.nmsl.text,
                                success:(res)=>{
                                    console.log(`调试:复制成功`, res);
                                    this.showToast({title:'复制成功'});
                                },
                                fail:(err)=>{
                                    console.error(`错误:`, err)
                                    this.showToast({title:'复制失败',type:'fail'});
                                }
                            });
                        }
                    break;
                }
                display.scrollTop = (this.active-6 <0 ?0 : this.active-6) *  ( display.scrollHeight /  (this.menus.length -6));

                console.log(`调试:`, this.active,display,display.scrollTop)

            },
            showContent(content){
                 this.showMenu = false;
                this.content =content
            },
            pachong(){
                this.timer=setInterval(()=>{
                    pullNMSL({type:'ktff'}).then(res=>{
                        console.log(`调试:KTFF`, res)
                    });
                    // pullNMSL({type:'sclh'}).then(res=>{
                    //     console.log(`调试:SCLH`, res)
                    // })
                    // pullNMSL({type:'chp'}).then(res=>{
                    //     console.log(`调试:CHP`, res)
                    // })
                },1000)

            },
            showToast({title='Toast',type='success', icon,d=2000}){
                let  types={
                    "success":'roundcheckfill',
                    "fail":"roundclosefill",
                    'none':''
                }
                this.toastShow = true;
                this.toastText  = title;
                this.toastIcon = icon || types[type];
                setTimeout(()=>{
                    this.toastShow = false
                },d)
            },
            async getNMSL(type='ktff'){
                this.loading =true;

                let nmsl = await  getNMSL({type});
                this.nmsl = nmsl;
                this.loading =false;
                console.log(`调试:数据获取成功`, nmsl.text);
                this.showContent(`<img src="${nmsl.src}" style="width: 100%;height: 100%;">`);
            }
        }
    }
</script>

<style scoped>
  .game_boy{
      height: 90vh;
      width: 95%;
      background-image: url("../../static/diwen.png");
      background-size: cover;
      background-color: #d9d9d9;
      border:2px solid #000;
      border-radius: 20rpx;
      border-bottom-right-radius: 160rpx;
      box-shadow: 10px 10px 0px rgba(128, 128, 128, 0.75);
      padding: 40rpx;
      position: relative;
  }
    .display_warp{
        height:400rpx;
        background-color:#746f7f;
        border:2px solid #000;
        width: 95%;
        margin: 0 auto;
        border-bottom-right-radius: 100rpx;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .display{
        width: 350rpx;
        height: 350rpx;
        font-family: msk;
        border:2px solid #000;
        background: #939400;
        color: #002000;
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        overflow-y: scroll;

    }
    .direction_button{
        width: 210rpx;
        height:210rpx;
        text-align: center;
        /*background: red;*/
        /*display: flex;*/
        /*justify-content: center;*/
    }
    .direction_btn{
        width:70rpx;
        height: 70rpx;
        background: #4f4f4f;
        border-top-left-radius: 10rpx;
        border-top-right-radius: 10rpx;
        display: inline-block;
        margin: -1px;

    }
    .direction_center{
        border-top-left-radius: 0rpx;
        border-top-right-radius: 0rpx;
    }
    .direction_center_cirle{
        height: 100%;
        width: 100%;
        background-color: #3c3c3c;
        border-radius: 100%;

    }
    .direction_up{
        transform: rotate(0deg);
        border-right: 3px solid rgba(0, 0, 0, 0.3);

    }
  .direction_right{
    transform: rotate(90deg);
      border-right: 3px solid rgba(0, 0, 0, 0.3);
      border-top: 3px solid rgba(0, 0, 0, 0.3);

  }
  .direction_down{
      transform: rotate(180deg);
      border-left: 3px solid rgba(0, 0, 0, 0.3);
      border-top: 3px solid rgba(0, 0, 0, 0.3);

  }
  .direction_left{
      transform: rotate(270deg);
      border-left: 3px solid rgba(0, 0, 0, 0.3);

  }

    .direction_click{
        border:0px;
    }


    .control_button{
        width: 250rpx;
        height: 100rpx;
        background-color: #c5babf;
        border-radius: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20rpx;
        transform: rotate(-25deg);

    }
    .control_btn{
        width: 80rpx;
        height: 80rpx;
        background-color: #c3003e;
        border-radius: 100%;
        border:3px solid #000;
        line-height: 80rpx;
        text-align: center;
        color: rgba(0, 0, 0, 0.4);
    }
  .control_btn_hover{
      width: 77rpx;
      height: 77rpx;
  }
  .menu_btn_warp{
      width: 120rpx;
      text-align: center;
      margin-right:50rpx;
      transform:rotate(-20deg);
  }
  .menu_button{
      position: absolute;
      bottom: 100rpx;
      width: 100%;


  }
.menu_btn{
    background-color: #3d3d3d;
    width: 120rpx;
    border-radius: 20rpx;
    height: 40rpx;
    border: 5px solid  #c3c3c3;
}
  .menu_btn_hover{
      width: 115rpx;
      height: 35rpx;
  }
 .menu_btn_text{
        font-size: 10px;
        margin-top: 10rpx;
        letter-spacing: 3px;
     color: rgba(0, 0, 0, 0.52);
 }
    @font-face{
        font-family: 'msk';
        src: url("../../static/MSK.TTF") format('truetype');
    }
</style>
