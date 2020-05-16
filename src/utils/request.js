
import Vue from 'vue'

import Request from './HttpRequest'
import cache from "./cache"
import {Base64} from './base64'
const ENV = Vue.prototype.ENV;
const ENV_MAP = {
    'prod':'http://eleme.lianfangti.cn',
    'dev':'https://api.easy.echosite.cn',
};
Vue.prototype.BASE_URL = ENV_MAP[ENV]

const request = new Request();
request.setConfig((config) => { /* 设置全局配置 */
    config.baseUrl =ENV_MAP[ENV];
    return config
})
request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
    config.header = {
        ...config.header,
        "token":cache.get('token') || '',
        "X-Token":cache.get("X-Token") || '',
        "from": 'mp',
    };
    if(cache.get("tokens")){
        config.header['tokens'] = cache.get("tokens");
    }
    // console.log(`调试:请求拦截器`, config);
    return config;
})
request.interceptor.response((response) => { /* 请求之后拦截器 */
    // console.log(`调试:响应拦截器`, response);kin's
    if(!(response.data.code ==0 || response.data.code ==20000 )){
        let from = `${response.config.method} ${response.config.url.replace(response.config.base,"")}`;
        if(response.data.code === 400){ // Token 失效
            window.location.href =window.location.protocol + "//" + window.location.host
        }
        if(response.data.code === 403){ // Token 失效
            cache.del("X-Token");
           let href= window.location.protocol + "//" + window.location.host+'/'+window.location.search;
            console.log(`调试:要跳转的`, href,window.location)
            window.location.href =href
        }

        return Promise.reject({from,error:response.data || response.data})
    }
    return response.data;
})


export {
    request
};


