class Cache {
    set(key, value, {sync = true} = {}) {
        // sync为true时 默认为同步
        value = (value instanceof Object) ? JSON.stringify(value) : value;
        // console.log(`调试:value的值 `, value,typeof(value));
        if (sync) {
            return uni.setStorageSync(key,value)
        } else {  // 为false时 为异步  返回 Promise
            return new Promise((resolve, reject) => {
                uni.setStorage({
                    key,
                    data: value,
                    success: resolve,
                    fail: reject
                })
            })

        }
    }

    get(key, {sync = true} = {}) {
        if (sync) {
            let value =  uni.getStorageSync(key);
            if(this.isJSON(value)){
                value = JSON.parse(value)
            }
            return value;
        } else {  // 为false时 为异步  返回 Promise
            return new Promise((resolve, reject) => {
                uni.getStorage({
                    key,
                    success: resolve,
                    fail: reject
                })
            })

        }

    }

    del(key, {sync = true} = {}) {
        if (sync) {
            return uni.removeStorageSync(key)
        } else {  // 为false时 为异步  返回 Promise
            return new Promise((resolve, reject) => {
                uni.removeStorage({
                    key,
                    success: resolve,
                    fail: reject
                })
            })

        }


    }
   isJSON(str) {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch(e) {
        }
        return false;
    }

}

const cache = new Cache();
export default cache
