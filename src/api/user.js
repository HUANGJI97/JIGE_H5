import {request} from "../utils/request";
import cache from "../utils/cache"
import  Vue from  'vue'
const ENV = Vue.prototype.ENV;



/**
 * 获取用户信息
 * @param access_token
 * @param token
 * @param openid
 * @returns {Promise<*>}
 */
export async function getUserInfo({access_token,token,openid}) {
    let result =   await  request.get({
        url:'/jige/userinfo',
        data:{
            access_token,
            token,
            openid
        }
    });
    cache.set("userInfo",result.data);
    return  result.data
}

export  async function getNMSL({type = 'ktff'}={}) {
    let result = await request.get({
        url:'/jige/nmsl',
        data:{type}
    });
    return  result.data
}
export  async function pullNMSL({type='ktff'}) {
    let result = await request.get({
        url:'/jige/pullnmsl',
        data:{type}

    });
    return  result.data
}
/**
 * 获取排行榜
 * @param type
 * @returns {Promise<*>}
 */
export async function getRanking({type = 'all'} = {}){
 let result = await request.get({
   url:'/jige/rank',
   data:{
       type
   }
 })
 return  result.data
}


export async function getNotice({status = 'all'} = {}){
 let result = await request.get({
   url:'/notice/list',
   data:{
       status
   }
 })
 return  result.data
}

export async function readNotice({id}){
 let result = await request.post({
   url:'/notice/read',
   data:{
       id
   }
 })
 return  result.data
}
export async function getNoticeCoin({id}){
 let result = await request.post({
   url:'/notice/getcoin',
   data:{
       id
   }
 })
 return  result.data
}

/**
 * 获取推广码
 * @returns {Promise<any>}
 */
export async function  getExtensionCode(){
    if(cache.get("exCode")){
        return  cache.get("exCode")
    }else{
        let result = await request.get({
            url:'/jige/extensioncode',
        });
        cache.set("exCode",result.data);
        return  result.data
    }

}


export async function getExtensionUser({page=1,size=20,type='all'}={}){
    let  token = cache.get('token');
    let {id} =cache.get("userInfo");
    let result = await request.get({
      url:'/jige/extensionuser',
      data:{
          token,
          id,
          page,
          size,
          type
      }
    });
    return  result.data
}

/**
 * 获取access_token
 * @param code
 * @param token
 * @returns {Promise<*>}
 */
export async function getAccessToken({code,token}) {
   let result =   await  request.get({
        url:'/jige/access_token',
        data:{
            code,
            token
        }
    }).catch(({error})=>{
        console.log(`调试:错误`,error);
        if(error.code){
            Login({token});
        }else{
        }
        return Promise.reject(error);
   });
    console.log(`调试:获取到的AccessToken信息`, result.data);
    cache.set('X-Token',result.data.openid);
    cache.set("tokens",result.data);

    return  result.data
}



/**
 * 用户登录
 * @param token
 * @returns {Promise<void>}
 * @constructor
 */

export async function Login({token,env=ENV}) {
    // let {code} = await wxlogin();
    console.log(`调试:开始登录`, token);
    let {data:{url}} =  await request.get({
        url: '/jige/login',
        data:{
            token,env
        }
    }).catch(({error})=>{
        console.log(`调试:出错`, error);
        if(error.code == 400){
            window.location.href =window.location.protocol + "//" + window.location.host
        }

    });
    window.location.href = url;
    console.log(`调试:获取授权url`, url);
}

/**
 * 检查签到
 * @date 2019年07月08日15:52:22
 * @returns {Promise<void>}
 */
export async function checkSignin(){
  let result =  await request.get({
    url:'/jige/checksignin'
  })
  return  result.data
}

/**
 * 签到
 * @returns {Promise<*>}
 */
export async function signin(){
    let result =  await request.post({
        url:'/jige/signin'
    })
    return  result.data
}


export async function getMpConfig(){
    let result =  await request.get({
        url:'/jige/system_config'
    })
    return  result.data
}



export async function getMobile({encryptedData,iv }) {
    // const login = await wxlogin();
    // const {encryptedData, iv} = await getUserInfo({jump: true});
    let mobie = await request.post({
        url: `/wxfanmobile`,
        data: {
            encryptedData,
            iv,
        }
    })
    console.log(`调试:获取手机号信息`, mobie)
    // console.log(`调试:获取用户信息`, encryptedData,iv)
}


/**
 * 获取登录code
 * @type: Object
 * @returns 返回code
 * @Auth: lianfangti@qq.com
 * @Date: 2019-06-27 16:44:42
 * **/

async function wxlogin() {
    return await new Promise((resolve, reject) => {
        uni.login({
            success: resolve,
            fail: reject
        })
    })

}


/**
 * 获取小程序设置信息
 * @type: Object
 * @returns 返回小程序设置信息
 * @Auth: lianfangti@qq.com
 * @Date: 2019-06-27 16:42:42
 * **/
async function getSetting() {
    return await new Promise((resolve, reject) => {
        uni.getSetting({
            success(res) {
                // console.log(`调试:获取设置信息成功`, res)
                resolve(res.authSetting);
            },
            fail(err) {
                reject({from: 'getSetting', error: err})
            }
        })
    })
}

async function getFackUser(){
    let headimgurls=[
        "https://cdn.nlark.com/yuque/0/2018/jpeg/anonymous/1544580626166-9faae07c-19d7-44fd-bbb1-2d246fcc0131.jpeg?x-oss-process=image/resize,m_fill,w_64,h_64/format,png",
        "https://cdn.nlark.com/yuque/0/2019/jpeg/anonymous/1551610186785-77ea1fa8-22d8-4a98-8d29-bd4bb5197349.jpeg?x-oss-process=image/resize,m_fill,w_64,h_64/format,png",
        "",
        "",
        "",
        "",
        "",
    ]
    let list = {

    }
}


