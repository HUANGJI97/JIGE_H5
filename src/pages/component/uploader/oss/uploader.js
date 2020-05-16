const OSS = require('./oss');

export function uploadToOss({filePath, savePath}) {
    return new Promise((resolve, reject) => {
        OSS({
            filePath: filePath,
            dir: savePath,
            success: (res, url) => {
                resolve({path: res, fillUrl: `${url}/${res}`})
            },
            fail(res) {
                reject(res)
            }
        })
    })
}


