<template>
  <view class="log-content">
    <NavBarComponent :title="title" :backIcon="true"></NavBarComponent>
    <uni-section class="mb-10 bgc" title="2023-8-18 V0.0.1" subTitle="Demo框架形成" type="line"></uni-section>
    <uni-section class="mb-10 bgc" title="2023-8-21 V0.0.2" subTitle="
    1. 新增请求封装，重复请求拦截
    2. 路由拦截器
    3. 小程序登录逻辑
    4. 更新版本日志页面" type="line"></uni-section>
  </view>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import NavBarComponent from '../components/nav-bar.vue';

const title = ref('更新日志');
</script>
<style scoped lang="scss">
::v-deep .uni-section {
  background-color: #f8f8f8;
}

.log-content {
  height: 100vh;
  background-color: #1d2129;
  color: #f8f8f8;

  .mb-10 {
    margin-bottom: 10px;
  }
}
</style>
