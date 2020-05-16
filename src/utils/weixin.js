import {delay, encodeParams} from "./utils"
import Vue from 'vue'

//this is weixinjs
/**
 * 获取登录code
 * @type: Object
 * @returns 返回code
 * @Auth: lianfangti@qq.com
 * @Date: 2019-06-27 16:44:42
 * **/

export async function login() {

    console.log(`调试:开始调用登录login`);

    return await new Promise((resolve, reject) => {

        uni.login({
            success: res => {
                console.log(`调试:调用wx.login成功`, res);
                resolve(res)
            },
            fail: res => {
                console.log(`调试:调用wx.login失败`, res);
                reject(res)
            }
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
export async function getSetting() {
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

export async function getUserInfoAuthorizeState(){
    const setting = await getSetting();
    console.log(`调试:所有setting`, setting);
    let isAuthroize = {
        'mp-weixin': setting['scope.userInfo'],
        'mp-alipay': setting['userInfo']
    }[Vue.prototype.CUR_MP];
    return  Promise.resolve(isAuthroize);

}



/**
 * 获取用户信息
 * @param jump: Boolean  当用户未授权时 是否跳转到授权页
 * @param just: Boolean  是否只返回用户信息
 * @type  Object
 * @returns 返回用户信息以及附加加密信息
 * @Auth: lianfangti@qq.com
 * @Date: 2019-06-27 16:42:42
 * **/
export async function getUserInfo({jump = false, just = false} = {}) {
    return await new Promise(async (resolve, reject) => {
        const setting = await getSetting();
        console.log(`调试:获取到Setting信息`, setting);
        // console.log('当前平台',Vue.prototype.CUR_MP);
        let isAuthroize = {
            'mp-weixin': setting['scope.userInfo'],
            'mp-alipay': setting['userInfo']
        }[Vue.prototype.CUR_MP];

        if (!isAuthroize) { //判断用户是否已授权
            console.log(`调试:用户未授权`, setting);
            if (jump) {
                navigateTo({
                    url: '../login/login',
                    params: {
                        onlyUserInfo: true,
                        redirect: '../index/index?page=user'
                    }
                })
            }
            reject({from: 'getUserInfo', error: '用户未授权'});
            return;
        }
        console.log(`调试:用户已授权`, isAuthroize);
        let provider = await getProvider();
        console.log(`调试:获取服务商信息`, provider);
        if(Vue.prototype.CUR_MP === "mp-weixin"){
            console.log(`调试getUserInfo:当前是微信逻辑`);
            uni.getUserInfo({
                // withCredentials: !just,
                provider: 'weixin',
                success(res) {
                    resolve(just ? res.userInfo : res);
                },
                fail(error) {
                    console.error(`错误:获取用户信息失败`, error);
                    reject({from: 'getUserInfo', error})
                }
            });
        }else if (Vue.prototype.CUR_MP === "mp-alipay"){  // 支付宝小程序逻辑
            console.log(`调试getUserInfo:当前是支付宝逻辑`);
            uni.getAuthCode({
                scopes: 'auth_user',
                success(){
                    uni.getAuthUserInfo({
                        success: (res) => {
                            console.log(`调试:获取到用户信息`, res);
                            res['avatarUrl']=res['avatar'];
                            resolve(res)
                        }, fail(err) {
                            reject({origin:'getAuthUserInfo',error:err,message:'获取支付宝用户信息失败'})

                        }
                    });
                },
                fail(err) {
                    reject({origin:'getAuthCode',error:err,message:'支付宝授权失败'})
                }
            })
        }

    })
}

/**
 * 获取服务商信心
 * @param service
 *            - oauth: 授权登录
 *            - share: 分享
 *            - payment: 支付
 *            - push: 推送
 * @returns {Promise<any>}小程序商户信息
 */
export async function getProvider({service = 'oauth'} = {}) {
    return await new Promise((resolve, reject) => {
        uni.getProvider({
            service,
            success(res) {
                resolve(res.provider[0])
            },
            fail(error) {
                reject({from: 'getProvider', error})
            }
        })
    })
}


// 支付
export async function requestPayment(options) {
    console.log(`调试:requestPament接收到参数`, options);
    return await new Promise((resolve, reject) => {
        uni.requestPayment({
            ...options,
            success: resolve,
            fail(err) {
                reject({origin: "支付接口", error: err});
            }
        })
    })

}

// 确认框
export async function comfirm(options) {
    console.log(`调试:你调用了comfrm`);
    return new Promise((resolve, reject) => {
        uni.showModal({
            ...options,
            success({confirm}) {
                console.log(`调试:showModal Success`, confirm);
                resolve(confirm)
            },
            fail(err) {
                console.log(`错误:showModal Fail`, err);
                reject({origin: 'comfirm方法', error: err})
            }

        })

    })
}

/**
 *  @author  lianfangti@qq.com 2019年06月13日 15:56:41
 *  @TODO    页面跳转封装 增加 params 参数进行传参
 *  @param   options:NavigateToOptions
 *  @returns void
 * */
export async function  navigateTo(options) {
    if (options.params) {
        options.url = `${options.url}${encodeParams(options.params)}`

    }
    if(options.delay){
        await  delay(options.delay);
    }
    if (options.relaunch) {  // 清空所有页面栈跳转
        uni.reLaunch({
            ...options,
            success(){

            }
        });
    } else if (options.redirect) { // 重定向跳转
        uni.redirectTo(options) // 打开新的页面跳转
    } else {   //
        uni.navigateTo(options)

    }
}

// 获取位置
export async function getLocation() {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            type: {"mp-weixin":'gcj02','mp-alipay':0}[Vue.prototype.CUR_MP] ,
            success: resolve,
            fail(err) {
                console.error(`错误:getLocation Fail`, err);
                reject({origin: 'utils.getLocation', error: err})
            }
        });
    })

}

//扫码
export async function scan() {
    return new Promise((resolve, reject) => {
        uni.scanCode({
            success(res) {
                resolve(res.result)
            },
            fail(err) {
                console.error(`错误:scanCode Fail`, err);
                reject({origin: 'utils.scanCode', error: err,message:'取消扫码'})
            }
        });
    })

}


//支付分签约

export async function openBusinessView(options) {
    return new Promise((resolve, reject) => {
        uni.openBusinessView({
            ...options,
            success: (res) => {
                console.log('支付分成功返回', res['extraData'], res);
                // uni.showModal({
                //     title:"调试",
                //     content:`${res["extraData"]['appid']}`
                // })
                if (res["extraData"]['appid']) {
                    console.error(`调试:无权限开通支付分`);
                    reject({origin: 'openBusinessView', error: res, message: '您不可开通支付分'});
                } else {
                    resolve(res);
                }

            },
            fail(err) {
                console.log('支付分失败返回', JSON.stringify(err));
                reject({origin: 'openBusinessView', error: err, message: '支付分签约失败'});
                console.error(`错误微信分签约失败`, err)
            }
        });
    })

}


// 图片选择
export async function chooseImage(options) {
    return new Promise((resolve, reject) => {
        uni.chooseImage({
            ...options,
            success: resolve,
            fail(err) {
                reject({origin: 'chooseImage', error: err, message: '图片选择失败'});
            }
        })
    })

}
