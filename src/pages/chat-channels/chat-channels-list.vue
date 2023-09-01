<template>
  <view class="chat-list">
    <NavBarComponent :title="title"></NavBarComponent>
    <uni-list v-if="channelList.length > 0">
      <uni-list :border="true">
        <uni-list-chat
          v-for="(item, index) in channelList"
          :key="index"
          :title="item.channelName"
          :avatar="transform(item.avatar)"
          :note="item.lastMessageUser + ':' + item.lastMessage"
          :time="item.lastMessageTime"
          clickable
          @click="selectClick(item)"
          badge-positon="left"
        >
        </uni-list-chat>
      </uni-list>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';
import { queryChannel } from '../../core/api-service/api/chat.api';
import type { User } from '@/shared/interface/user';
import type { Token } from '@/shared/interface/token';
import { getStorageSync, transform } from '@/utils';
import type { ChatChannelInterface } from '@/shared/interface/chat-channels';
import { CommonUtil } from '@/utils/commonUtil';
import { onPullDownRefresh, onShow } from '@dcloudio/uni-app';

const tokenInfo: Token = getStorageSync('tokenInfo');
const userInfo: User = getStorageSync('userInfo');
const title = ref('频道');
const channelList: Ref<ChatChannelInterface[]> = ref([]);
// 下拉刷新
onPullDownRefresh(() => {
  // 请求查询聊天频道
  queryChannelList(userInfo.id, true);
});
// 当返回列表时重新查询
onShow(() => {
  // 请求查询聊天频道
  queryChannelList(userInfo.id);
});
/**
 * 查询聊天频道
 * @param id 用户id
 * @param isRefresh 是否为刷新获取
 */
const queryChannelList = async (id: string, isRefresh?: boolean) => {
  await queryChannel(id).then((result: ChatChannelInterface[]) => {
    if (result) {
      channelList.value = result.map((item) => {
        item.lastMessageTime = CommonUtil.dateFmt(
          'yyyy/MM/dd hh:mm:ss',
          new Date(item.lastMessageTime)
        );
        return item;
      });
    }
    if (isRefresh) {
      // 停止下拉刷新动画
      uni.stopPullDownRefresh();
    }
  });
};
if (tokenInfo) {
  queryChannelList(userInfo.id);
}
// 点击进入频道
const selectClick = (channel: ChatChannelInterface) => {
  // console.log(channel);
  uni.navigateTo({
    url: `chat-base?id=${channel.id}&channelId=${channel.channelId}&name=${channel.channelName}`,
  });
};
</script>

<style scoped lang="scss">
.chat-list {
  height: 100vh;
  background-color: #1d2129;
}
</style>
