<template>
  <view class="index-content">
    <NavBarComponent :title="title"></NavBarComponent>
    <view class="content">
      <image mode="'scaleToFill'" class="logo" src="/static/logo.png" />
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';
const title = ref('首页');
</script>

<style scoped lang="scss">
.index-content {
  height: 100vh;
  background-color: #1d2129;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
