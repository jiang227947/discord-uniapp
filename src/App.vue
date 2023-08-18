<script setup lang="ts">
import {onLaunch, onShow, onHide} from "@dcloudio/uni-app";
import routingIntercept from './utils/route'

onLaunch(() => {
  // console.log("App Launch");
  // routingIntercept();
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