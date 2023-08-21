<template>
  <view class="nav-bar" :style="{ height: height + 'px' }">
    <view class="nav-left operate dis-flx">
      <!-- 回退图标 -->
      <image src="../../static/tabBar/返回.png" class="back" @click="back()" v-if="backIcon"></image>
    </view>
    <view class="nav-title dis-flx">
      <text class="title">{{ title }}</text>
    </view>
    <view class="nav-right operate dis-flx"></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 自定义导航栏高度总和
let height = ref(0);
// 微信小程序胶囊布局位置信息
let menuButtonRect = {};
// 状态栏高度
let statusBarHeight = 0;
// 导航栏高度（不包含状态栏）
let navBarHeight = 0;

// 判断获取微信小程序胶囊API是否可用
if (uni.canIUse('getMenuButtonBoundingClientRect')) {
  // 获取状态栏高度(电量时间通知等信息-单位px)
  let sysInfo = uni.getSystemInfoSync();
  statusBarHeight = sysInfo.statusBarHeight as number;
  // 获取微信小程序胶囊布局位置信息
  let rect = uni.getMenuButtonBoundingClientRect();
  menuButtonRect = JSON.parse(JSON.stringify(rect));
  // (胶囊上部高度-状态栏高度)*2 + 胶囊高度 = 导航栏高度（不包含状态栏）
  //以此保证胶囊位于中间位置，多机型适配
  navBarHeight = (rect.top - statusBarHeight) * 2 + rect.height;
  // 状态栏高度 + 导航栏高度 = 自定义导航栏高度总和
  height.value = statusBarHeight + navBarHeight;
} else {
  uni.showToast({
    title: '您的微信版本过低，界面可能会显示不正常',
    icon: 'none',
    duration: 3000,
  });
}

const back = () => {
  uni.navigateBack({
    delta: 1, //返回层数，2则上上页
  });
};
/**
 * TS写法，如果需要设置默认值，需要在外层包装withDefaults函数，接受两个参数，全是对象，设置默认值的时候，如果是一个复杂的对象，
 * 则需要列举出它的所有键值对，并将结果返回才行
 */
withDefaults(
  defineProps<{
    title: string;
    backIcon?: boolean;
    backParam?: string;
  }>(),
  {
    title: 'Default message',
    backIcon: false,
  }
);
</script>

<style scoped lang="scss">
.nav-bar {
  position: relative;
  background-color: #383a40;
  display: flex;
  flex-direction: row;
  font-size: 16px;

  .operate {
    width: 25px;
  }
  .dis-flx {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .nav-left {
    flex: 0.2;
    .back {
      width: 25px;
      height: 25px;
      margin-bottom: -20px;
    }
  }
  .nav-title {
    flex: 1;
    color: #f8f8f8;
    .title {
      margin-bottom: -20px;
    }
  }
  .nav-right {
    flex: 0.2;
  }
}
</style>
