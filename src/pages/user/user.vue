<template>
  <view class="user-content">
    <NavBarComponent :title="title"></NavBarComponent>
    <view class="user-card bgc1">
      <view class="user-info">
        <image src="../../static/20230815221417.jpg" mode="scaleToFill" class="avatar"></image>
        <view class="user-name">
          <text>来回三五七</text>
          <text class="phone">17671612595</text>
        </view>
      </view>
      <view class="update">修改信息</view>
    </view>
    <view class="user-data bgc1"> </view>
    <view class="user-operate bgc1">
      <view class="operate-item">
        <image src="../../static/icon/关于.png" mode="scaleToFill" class="operate-icon" />
        <text>关于</text>
      </view>
      <view class="operate-item">
        <image src="../../static/icon/反馈.png" mode="scaleToFill" class="operate-icon" />
        <text>反馈</text>
      </view>
      <view class="operate-item" @click="toPage('updata-log')">
        <image src="../../static/icon/日志.png" mode="scaleToFill" class="operate-icon" />
        <text>更新日志</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';

const title = ref('我的');
const toPage = (path: string) => {
  console.log(path);
  uni.navigateTo({ url: path });
};
</script>

<style scoped lang="scss">
.user-content {
  height: 100vh;
  background-color: #1d2129;
  color: #f8f8f8;
}

.bgc1 {
  background-color: #4e5969;
}
.user-card {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .user-info {
    display: flex;
    font-size: 16px;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 6px;
    }
  }
  .update {
    font-size: 14px;
    padding: 6px;
    border: 1px solid #f8f8f8;
    border-radius: 16px;
  }

  .user-name {
    display: inline-grid;
    .phone {
      font-size: 14px;
      padding-top: 4px;
    }
  }
}
.user-data {
  margin: 12px;
  padding: 20px;
  border-radius: 20px;
}
.user-operate {
  margin: 12px;
  padding: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .operate-item {
    text-align: center;
    text {
      display: block;
    }
  }
  .operate-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }
}
</style>
