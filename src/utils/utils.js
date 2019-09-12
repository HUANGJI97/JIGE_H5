// 延时
export async function delay(ms = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, ms)
    })
}

// 确认框
export async function comfirm(options) {
    console.log(`调试:你调用了comfrm`)
    return new Promise((resolve, reject) => {
        uni.showModal({
            ...options,
            success({confirm}) {
                console.log(`调试:showModal Success`, confirm)
                resolve(confirm)
            },
            fail(err) {
                console.log(`错误:showModal Fail`, err)
                reject({origin: 'comfirm方法', error: err})
            }

        })

    })
}

// 支付
export async function requestPayment(options) {
    console.log(`调试:requestPament接收到参数`, options)
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


export function isJSON(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch (e) {
    }
    return false;
}

/**
 *  @author  lianfangti@qq.com 2019年06月13日 15:56:41
 *  @TODO    页面跳转封装 增加 params 参数进行传参
 *  @param   options:NavigateToOptions
 *  @returns void
 * */
export function navigateTo(options) {
    if (options.params) {
        options.url = `${options.url}${encodeParams(options.params)}`
    }
    uni.navigateTo(options)
}


/**
 *  @author  lianfangti@qq.com 2019年06月13日 15:56:41
 *  @TODO    对象转url参数
 *  @param   { Object }  params
 *  @returns { String }
 * */
function encodeParams(params = {}) {
    let s = '?';
    for (let key in params) {
        s += `${key}=${params[key]}&`
    }
    return s.substring(0, s.length - 1);
}

/**
 *  @author  lianfangti@qq.com 2019年06月13日 15:56:41
 *  @TODO    url参数转对象
 *  @param   { String }  url
 *  @returns { Object }
 * */
export function decodeParams(url) {
    let result = {};
    if (url.indexOf('?') !== -1) {
        url.split('?')[1].split('&').forEach(item => {
            result[item.split('=')[0]] = item.split('=')[1]
        });
    } else {
        url.split('&').forEach(item => {
            result[item.split('=')[0]] = item.split('=')[1]
        });
    }
    return result

}

/**
 *  @author  lianfangti@qq.com 2019年06月13日 15:56:41
 *  @TODO    获取两个时间差
 *  @param    sDate: String   开始时间
 *            eDate: String   结束时间
 *            type : String   可选值 s 秒 m 分  h 小时 d 天
 *  @returns  number          差值
 * */
export function dateDifference(sDate, eDate, type = 'd') {    //sDate1和eDate是2019-06-13格式
    var dateSpan, tempDate, diff, result;
    const typeMap = {"s": 1000, "m": 1000 * 60, "h": 1000 * 60 * 60, "d": 1000 * 60 * 60 * 24}
    sDate = sDate instanceof Date ? sDate : new Date(sDate);
    eDate = eDate instanceof Date ? eDate : new Date(eDate);
    dateSpan = sDate.getTime() - eDate.getTime();
    dateSpan = Math.abs(dateSpan);
    diff = (dateSpan / typeMap[type]);
    if (type === 'd' && diff % 1 !== 0 && diff < 1) {
        result = 1 //如果类型为天时  小于一天算一天
    } else {
        result = Math.floor(diff)
        if (diff % 1 !== 0) {
            result += 1
        }
    }
    return result
}

export  function dateFormat(timestamp, format) {
    const date = new Date(timestamp);
    const o = {
        'Y+':date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds(),
    };
    let formatString = format;
    if (/(y+)/.test(format)) {
        formatString = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach((key) => {
        if (new RegExp(`(${key})`).test(format)) {
            formatString = formatString.replace(RegExp.$1, RegExp.$1.length === 1 ? o[key] : (`00${o[key]}`).substr(`${o[key]}`.length));
        }
    });
    return formatString;
}

export  function isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;

}
export function  randomIntegerInRange   (min, max){return  Math.floor(Math.random() * (max - min + 1)) + min};
