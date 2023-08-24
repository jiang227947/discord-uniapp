/**
 * 提示方法
 * @param {String} title 提示文字
 * @param {String}  icon icon图片
 * @param {Number}  duration 提示时间
 */
export function toast(title: string, icon: string | any = 'none', duration: number = 1500) {
  if (title) {
    uni.showToast({
      title,
      icon,
      duration,
    });
  }
}

/**
 * 设置缓存
 * @param {String} key 键名
 * @param {String} data 值
 */
export function setStorageSync(key: string, data: string) {
  uni.setStorageSync(key, data);
}

/**
 * 获取缓存
 * @param {String} key 键名
 */
export function getStorageSync(key: string) {
  return uni.getStorageSync(key);
}

/**
 * 删除缓存
 * @param {String} key 键名
 */
export function removeStorageSync(key: string) {
  return uni.removeStorageSync(key);
}

/**
 * 清空缓存
 * @param {String} key 键名
 */
export function clearStorageSync() {
  return uni.clearStorageSync();
}

/**
 * 页面跳转
 * @param {'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack' | number } url  转跳路径
 * @param {String} params 跳转时携带的参数
 * @param {String} type 转跳方式
 **/
export function useRouter(url: any, params: any = {}, type: string | any = 'navigateTo') {
  try {
    if (Object.keys(params).length) url = `${url}?data=${encodeURIComponent(JSON.stringify(params))}`;
    if (type === 'navigateBack') {
      uni[type]({ delta: url });
    } else {
      uni[type]({ url });
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * 预览图片
 * @param {Array} urls 图片链接
 */
export function previewImage(urls: string[], itemList: string[]) {
  uni.previewImage({
    urls,
    longPressActions: {
      itemList,
      fail: function (error) {
        console.error(error, '===previewImage');
      },
    },
  });
}

/**
 * 保存图片到本地
 * @param {String} filePath 图片临时路径
 **/
export function saveImage(filePath: string) {
  if (!filePath) return false;
  uni.saveImageToPhotosAlbum({
    filePath,
    success: (res: any) => {
      toast('图片保存成功', 'success');
    },
    fail: (err: any) => {
      if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
        uni.showModal({
          title: '提示',
          content: '需要您授权保存相册',
          showCancel: false,
          success: (modalSuccess: any) => {
            uni.openSetting({
              success(settingdata) {
                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                  uni.showModal({
                    title: '提示',
                    content: '获取权限成功,再次点击图片即可保存',
                    showCancel: false,
                  });
                } else {
                  uni.showModal({
                    title: '提示',
                    content: '获取权限失败，将无法保存到相册哦~',
                    showCancel: false,
                  });
                }
              },
              fail(failData: any) {
                console.log('failData', failData);
              },
            });
          },
        });
      }
    },
  });
}

/**
 * 深拷贝
 * @param {Object} data
 **/
export const clone = (data: string) => JSON.parse(JSON.stringify(data));

/**
 * 头像地址转换
 * @param url 地址
 * @returns 返回地址
 */
export const transform = (url: string) => {
  if (url && url.indexOf('http' || 'https') !== -1) {
    return url;
  } else if (url !== null && url !== undefined) {
    return `https://www.evziyi.top${url}`;
  }
};