<template>
  <view class="chat-base">
    <NavBarComponent :title="title" :backIcon="true" class="nav-bar"></NavBarComponent>
    <view class="messagesWrapper">
      <!--消息列-->
      <ol class="scrollerInner" aria-label="用户" role="list" tabindex="0">
        <!--每一条消息-->
        <li
          class="messageListItem"
          aria-setsize="-1"
          v-for="(item, index) in messagesList"
          :key="index"
        >
          <!-- 一般消息 -->
          <template v-if="item.type === chatMessagesType.general">
            <view
              class="message"
              role="article"
              tabindex="-1"
              aria-setsize="-1"
              aria-roledescription="消息"
              aria-labelledby="message-username"
            >
              <!-- 留言消息回复 -->
              <view class="reference" v-if="item.messageReference">
                <span class="referenceUserName">@{{ item.messageReference.userName }}</span>
                <span class="referenceTxt">{{ item.referencedMessage }}</span>
              </view>
            </view>
            <!-- 消息内容 -->
            <view class="contents">
              <!-- 头像 -->
              <image
                v-if="item.author.avatar"
                :src="item.author.avatar"
                mode="scaleToFill"
                class="user-avatar"
              />
            </view>
            <!--消息头-->
            <h3 class="header" aria-labelledby="message-username">
              <p class="headerText">
                <!--用户名-->
                <span class="username" aria-expanded="false" role="button" tabindex="0">
                  {{ item.author.userName }}
                </span>
                <span class="timestamp" role="button" tabindex="0">
                  <!--时间-->
                  <!-- <time
                    aria-label="{{item.timestamp | date:'yyyy/MM/dd HH:mm:ss' | dateConversion}}"
                    datetime="{{item.timestamp}}"
                  >
                    {{item.timestamp | date:'yyyy/MM/dd HH:mm:ss' | dateConversion}}
                  </time> -->
                </span>
              </p>
            </h3>
          </template>
          <!-- 连续消息 -->
          <template v-else-if="item.type === chatMessagesType.continuous"> 连续消息</template>
          <!-- 系统消息 -->
          <template v-else> 系统消息</template>
        </li>
      </ol>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, type Ref, reactive } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';
import { onLoad } from '@dcloudio/uni-app';
import { queryChatMessage } from '@/core/api-service/api/chat.api';
import type {
  ChatMessageTypeInterface,
  ChatMessagesInterface,
} from '@/shared/interface/chat-channels';
import { PageParams } from '@/shared/model/pageParms';
import { ChatMessagesTypeEnum } from '@/shared/enum/chat-channels.enum';

// 标题
const title: Ref<string> = ref('');
// 分页参数
const pageParams: PageParams = new PageParams(1, 50);
// 聊天记录
let messagesList: ChatMessagesInterface[] = reactive<ChatMessagesInterface[]>([]);
// 消息类型枚举
const chatMessagesType: ChatMessageTypeInterface = ChatMessagesTypeEnum;
onLoad((option: any) => {
  console.log('option', option);
  title.value = option.name;
  queryChatMsg(option.channelId, pageParams.pageNum, pageParams.pageSize);
});
/**
 * 查询聊天记录
 * @param channelId 频道ID
 * @param pageNum 第几页
 * @param pageSize 一页多少条数据
 */
const queryChatMsg = async (channelId: string, pageNum: number, pageSize: number) => {
  await queryChatMessage({ channelId, pageNum, pageSize }).then(
    (result: ChatMessagesInterface[]) => {
      if (result) {
        messagesList.push(...result);
      }
    }
  );
};
</script>

<style scoped lang="scss">
@import './chat-base.scss';
.chat-base {
  height: 100vh;
  background-color: #1d2129;
  .nav-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

}
</style>
