<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import routingIntercept from './core/interceptor/route';
import { wxCodeAuthorization } from './core/api-service/api/login.api';
import type { OauthInterface } from './shared/interface/user';
import type { Token } from './shared/interface/token';
import { getStorageSync } from './utils';
onLaunch(() => {
  // console.log("App Launch");
  // routingIntercept();
  // 从storage获取登录信息，没有则需要登录
  let tokenInfo: Token = getStorageSync('tokenInfo');
  let hasValidToken = false;
  if (tokenInfo) {
    let time = new Date().getTime();
    // 存储时间小于token失效时间，才是有效token, 否则重新授权
    hasValidToken = time - tokenInfo.tokenTime < tokenInfo.tokenTimeout;
  }
  if (!hasValidToken) {
    // 调用小程序登录api
    uni.login({
      provider: 'weixin',
      success: async (wxInfo) => {
        console.log('wxInfo', wxInfo);
        // 获取到code后，提交给服务端
        await wxCodeAuthorization({ code: wxInfo.code }).then((res: OauthInterface) => {
          console.log('App res', res);
          // 存储获取到的token
          uni.setStorage({
            key: 'userInfo',
            data: res.userInfo,
          });
          // 存储获取到的token
          uni.setStorage({
            key: 'tokenInfo',
            data: res.userInfo.token,
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
@font-face {
  font-family: 'iconfont'; /* Project id 3355581 */
  src: url('./static/iconfont/iconfont.woff2') format('woff2'),
    url('./static/iconfont/iconfont.woff') format('woff'),
    url('./static/iconfont/iconfont.ttf') format('truetype');
}
</style>
