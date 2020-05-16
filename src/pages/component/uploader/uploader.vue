<template>
  <view class="flex justify-center">
      <view class="uploader flex  flex-wrap  " >
          <view class="uploader-item margin-top-sm margin-right-sm "  style="position: relative;"  v-for="(item,index) in temp_src">
              <image class="radius-xl " :src="item" style="width: 100%;height: 100%;" @tap="handlePreviewImage(index)"  >
              </image>
              <view class="cu cu-tag  badge round cuIcon-close padding bg-gradual-orange" style="border: 2px solid #ffffff;" @tap="removeImage(index)" ></view>
          </view>
          <view v-if="temp_src.length < max" @tap="handleChooseImage" class="cuIcon uploader-item radius-xxxl bg-gray margin-top-sm cuIcon-add text-black    " style="font-size: 70rpx;"></view>
      </view>
  </view>
</template>

<script>
    import {chooseImage} from "../../../utils/weixin";
    import {uploadToOss} from "./oss/uploader"

    export default {
        name: "uploader",
        data(){
            return{
                temp_src:[  ],
                urls:[]
            }
        },
        props:{
            max:{
                type:Number,
                default:9
            }
        },
        methods:{
            removeImage(index){
                console.log(`调试:移除图片`,index);
                 this.temp_src.splice(index,1);
            },
            handlePreviewImage(index){
                uni.previewImage({
                    urls:this.temp_src,
                    current:index
                })
            },
            async handleChooseImage(){
                let res= await  chooseImage({count:this.max});
                console.log(`调试:选择图片返回值`, res);
                let tempFiles =res.tempFiles || res.tempFilePaths;
                console.log(`调试:选择的图片`, tempFiles);
                let uploadedRes= [];

                for(let item of tempFiles){
                    this.temp_src.push(item.path || item);
                     try {
                         let uploadRes = await  uploadToOss({   filePath:item.path || item, savePath:"images/"});
                         console.log(`调试:上图片成功`,uploadRes );
                         uploadedRes.push(uploadRes);
                     }catch (e) {
                           console.error(`错误:上图片失败`, e)

                     }
                }
                this.$emit('change',uploadedRes.map(item=>{
                    item['path'] = `/${item.path}`;
                    return  item;
                }));
                // console.log(`调试:`, uploadedRes)
                // uni.chooseImage({
                //     count:this.max,
                //     success:(res)=>{
                //         console.log(`调试:文件选择回调`, res);
                //         res.tempFilePaths.forEach(item=>{
                //             console.log(`调试:`, item);
                //             this.temp_src.push(item)
                //         })
                //
                //     }
                // })
            }
        }
    }
</script>

<style scoped>
.uploader-item{
    width: 170rpx;
    height: 170rpx;
    border-radius: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>
