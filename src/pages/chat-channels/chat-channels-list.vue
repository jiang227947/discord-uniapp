<template>
  <view class="chat-list">
    <NavBarComponent :title="title"></NavBarComponent>
    <uni-list>
      <uni-list :border="true">
        <!-- 头像显示圆点 -->
        <uni-list-chat title="uni-app" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="dot"></uni-list-chat>
      </uni-list>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';
const title = ref('频道');

const onClick = (evt: any, params: any) => {
  console.log(evt);
};
</script>

<style scoped lang="scss">
.chat-list {
  height: 100vh;
  background-color: #1d2129;
}
</style>
