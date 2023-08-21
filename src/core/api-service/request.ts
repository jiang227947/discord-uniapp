import { getStorageSync, clearStorageSync, useRouter, toast } from '@/utils';
import RequestManager from './requestManager';
import type { Result } from '@/shared/interface/result';

const manager = new RequestManager();

const baseRequest = async (url: string, method: string | any, data: object = {}, loading = true) => {
  const requestId: string | boolean = manager.generateId(method, url, data);
  if (!requestId) {
    console.log('重复请求');
  }
  if (!requestId) return false;

  const header: any = {};
  header.token = getStorageSync('token') || '';
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
        if (result.code == 200) {
          // 业务逻辑
          reslove(result.data);
        } else {
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
