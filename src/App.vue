<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import routingIntercept from './core/interceptor/route';
import { wxCodeAuthorization } from './core/api-service/api/login.api';
import type { WxAuthResponse } from './shared/interface/user';
onLaunch(() => {
  // console.log("App Launch");
  // routingIntercept();
  // 从storage获取登录信息，没有则需要登录
  let tokenInfo = uni.getStorageSync('tokenInfo');
  let hasValidToken = false;
  if (tokenInfo) {
    let time = new Date().getTime();
    // 存储时间小于token失效时间，才是有效token, 否则重新授权
    hasValidToken = time - tokenInfo.date < tokenInfo.userInfo.token.tokenTimeout;
  }
  if (!hasValidToken) {
    // 调用小程序登录api
    uni.login({
      provider: 'weixin',
      success: async (wxInfo) => {
        console.log('wxInfo', wxInfo);
        // 获取到code后，提交给服务端
        await wxCodeAuthorization({ code: wxInfo.code }).then((res: WxAuthResponse) => {
          console.log('App res', res);
          // 存储获取到的token
          uni.setStorage({
            key: 'tokenInfo',
            data: res,
          });
        });
      },
    });
  }
});
onShow(() => {
  // console.log("App Show");
});
onHide(() => {
  // console.log("App Hide");
});
</script>
<style>
/**全局引入iconfont */
@import './static/iconfont/iconfont.css';
</style>