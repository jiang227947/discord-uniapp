import { getStorageSync, toast } from '@/utils';
import RequestManager from './requestManager';
import type { Result } from '@/shared/interface/result';
import { ResultCodeEnum } from '@/shared/enum/http.enum';
import type { Token } from '@/shared/interface/token';
import type { User } from '@/shared/interface/user';

const manager = new RequestManager();

const baseRequest = async (url: string, method: string | any, data: object = {}, loading = true) => {
  const requestId: string | boolean = manager.generateId(method, url, data);
  if (!requestId) {
    console.log('重复请求');
  }
  if (!requestId) return false;
  const tokenInfo: Token = getStorageSync('tokenInfo');
  const userInfo: User = getStorageSync('userInfo');
  // 设置请求头
  const header: any = {};
  if (userInfo) {
    header.userId = userInfo.id;
  }
  if (tokenInfo) {
    header[tokenInfo.tokenName] = `Bearer ${tokenInfo.tokenValue}`;
  }
  return new Promise((reslove, reject) => {
    loading && uni.showLoading({ title: 'loading' });
    uni.request({
      url: 'http://localhost:3001/api' + url,
      method: method || 'GET',
      header: header,
      timeout: 10000,
      data: data || {},
      complete: () => {
        // 结束loading
        uni.hideLoading();
        manager.deleteById(requestId);
      },
      success: (successData: any) => {
        const result: Result<any> = successData.data;
        if (result.code == ResultCodeEnum.success) {
          // 服务器请求成功，结果正确
          reslove(result.data);
        } else if (result.code == ResultCodeEnum.complete) {
          // 服务器请求成功，结果错误
          reslove(result.data);
        } else if (result.code == ResultCodeEnum.fail) {
          // 服务器请求失败或代码错误
          toast(result.msg);
          reject(result);
        }
      },
      fail: (msg) => {
        toast('网络错误，请稍后重试');
        reject(msg);
      },
    });
  });
};

const request: any = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method: any) => {
  request[method] = (api: string, data: any, loading: boolean) => baseRequest(api, method, data, loading);
});

export default request;
