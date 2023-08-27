<template>
  <view class="chat-base">
    <NavBarComponent :title="title" :backIcon="true" class="nav-bar"></NavBarComponent>
    <view class="content">
      <!-- 消息主体 -->
      <view class="messagesWrapper">
        <!--消息列-->
        <ol class="scrollerInner" aria-label="用户" role="list" tabindex="0">
          <!--每一条消息-->
          <z-paging
            class="scrollerBase"
            ref="zPagingRef"
            v-model="messagesList"
            use-page-scroll
            use-chat-record-mode
            @query="queryChatMsg"
            :default-page-size="40"
          >
            <li
              class="messageListItem"
              aria-setsize="-1"
              :id="`z-paging-${index}`"
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

                  <!-- 消息内容 -->
                  <view class="contents">
                    <!-- 头像 -->
                    <image
                      v-if="item.author.avatar"
                      :src="item.author.avatar"
                      mode="scaleToFill"
                      class="user-avatar"
                    />
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
                    <!--消息内容-->
                    <view class="markupMessage">
                      <!--附件消息-->
                      <!-- <app-chat-attachments
                  *ngIf="item.attachments"
                  [attachments]="item.attachments"
                ></app-chat-attachments> -->
                      <!--文字消息-->
                      <span v-if="!item.attachments">{{ item.content }}</span>
                    </view>
                    <!--添加反应-->
                    <view class="additive-reaction reactionHidden">
                      <!--表情-->
                      <!-- <span title="表情">
                  <svg class="aliicon" aria-hidden="true">
                    <use xlink:href="#icon-emojifill"></use>
                  </svg>
                </span> -->
                    </view>
                    <!--反应表情-->
                    <view class="additive-emoji" :class="{ 'hidden-additive': !item.reaction }">
                      <view
                        class="reaction-me"
                        v-for="(i, index) in item.reaction"
                        :key="index"
                        nzTooltipTitle="{{i.count}}人的反应为：{{i.emoji}}"
                        nzTooltipPlacement="top"
                        nz-tooltip
                      >
                        <span class="reaction-inner">{{ i.emoji }}</span>
                        <span class="reaction-count">{{ i.count }}</span>
                      </view>
                    </view>
                  </view>
                </view>
              </template>
              <!-- 连续消息 -->
              <template v-else-if="item.type === chatMessagesType.continuous">
                <view class="message continuous">
                  <!--消息时间-->
                  <view class="timestamp timeHidden">
                    <!-- <time
                  aria-label="{{item.timestamp | date:'yyyy/MM/dd HH:mm:ss' | timeConversion}}"
                  datetime="{{item.timestamp}}"
                >
                  {{item.timestamp | date:'yyyy/MM/dd HH:mm:ss' | timeConversion}}
                </time> -->
                  </view>
                  <!--文字消息-->
                  <view class="markupMessage">
                    <!--附件消息-->
                    <!-- <app-chat-attachments
                  *ngIf="item.attachments"
                  [attachments]="item.attachments"
                ></app-chat-attachments> -->
                    <!--文字消息-->
                    <span v-if="!item.attachments">{{ item.content }}</span>
                  </view>
                  <!--反应表情-->
                  <view class="additive-emoji" :class="{ 'hidden-additive': !item.reaction }">
                    <view
                      class="reaction-me"
                      v-for="(i, index) in item.reaction"
                      :key="index"
                      nzTooltipTitle="{{i.count}}人的反应为：{{i.emoji}}"
                      nzTooltipPlacement="top"
                      nz-tooltip
                    >
                      <span class="reaction-inner">{{ i.emoji }}</span>
                      <span class="reaction-count">{{ i.count }}</span>
                    </view>
                  </view>
                  <!--添加反应-->
                  <view class="additive-reaction reactionHidden">
                    <!--表情-->
                    <!-- <span title="表情">
                  <svg class="aliicon" aria-hidden="true">
                    <use xlink:href="#icon-emojifill"></use>
                  </svg>
                </span> -->
                  </view>
                </view>
              </template>
              <!-- 系统消息 -->
              <template v-else> 系统消息</template>
            </li>
          </z-paging>
        </ol>
      </view>
      <!--输入框-->
      <view class="channelTextArea">
        <!--回复引用消息-->
        <view class="recoverChat" v-if="recoverChat.recover">
          <view>
            <span>正在回复至</span>
            <span class="recoverChatForm">{{ recoverChat.form.userName }}</span>
          </view>
          <!--关闭回复-->
          <view class="closeRecover"> </view>
        </view>
        <!--输入框内部-->
        <view class="formArea">
          <!--附加-->
          <view class="additional">
            <!--表情-->
            <span class="icon" title="表情">
              <svg class="aliicon" aria-hidden="true">
                <use xlink:href="#icon-emojifill"></use>
              </svg>
            </span>
            <!--上传-->
            <!-- <span class="icon" title="上传">
              <svg class="aliicon" aria-hidden="true">
                <use xlink:href="#icon-jiahao2fill"></use>
              </svg>
            </span> -->
          </view>
          <!--文字-->
          <view class="textArea">
            <!--placeholder-->
            <view class="placeholder" aria-hidden="true" v-if="textValue === ''"
              >开始聊天（Enter发送，Shift+Enter换行）
            </view>
            <!--输入框-->
            <!--<view #textBox role="textbox" class="markup" spellcheck="true" aria-haspopup="listbox" aria-invalid="false"
                 aria-autocomplete="list" contenteditable="true"
                 (keydown)="textBoxKeydown($event)"
                 (paste)="paste($event)"
                 (input)="textBoxChange($event)">
            </view>-->
            <textarea class="markup" v-model="textValue"></textarea>
          </view>
          <!--发送按钮-->
          <view class="buttonArea">
            <button type="submit" class="send-button" title="send">
              <i class="iconfont icon-fasong"></i>
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, type Ref, reactive } from 'vue';
import NavBarComponent from '../components/nav-bar.vue';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import { queryChatMessage } from '@/core/api-service/api/chat.api';
import type {
  ChatMessageTypeInterface,
  ChatMessagesInterface,
} from '@/shared/interface/chat-channels';
import { PageParams } from '@/shared/model/pageParms';
import { ChatMessagesTypeEnum } from '@/shared/enum/chat-channels.enum';
import { onMounted } from 'vue';
import ZPaging from '../../uni_modules/z-paging/components/z-paging/z-paging.vue';
// 标题
const title: Ref<string> = ref('');
// 滚动条位置
const scrollTopPosition: Ref<number> = ref(0);
// 最后一条子元素id
const scrollView: Ref<string> = ref('');
// 第一条子元素id
const firstScrollView: Ref<string> = ref('');
// 分页参数
const pageParams: PageParams = new PageParams(1, 40);
// 频道信息
const channelInfo: {
  channelId: string;
} = reactive({ channelId: '' });
const zPagingRef = ref<InstanceType<typeof ZPaging>>();
// 聊天记录
let messagesList: Ref<ChatMessagesInterface[]> = ref([]);
// 消息类型枚举
const chatMessagesType: ChatMessageTypeInterface = ChatMessagesTypeEnum;
// 输入的文字
const textValue: Ref<string> = ref('');
// 回复引用消息参数
const recoverChat: { recover: boolean; txt: string; form: any } = reactive({
  recover: false,
  txt: '',
  form: null,
});
onLoad((option: any) => {
  console.log('option', option);
  title.value = option.name;
  channelInfo.channelId = option.channelId;
});
onMounted(() => {
  // queryChatMsg(channelInfo.channelId, pageParams.pageNum, pageParams.pageSize);
});
onPageScroll(async (e: any) => {
  //如果滚动到顶部，触发加载更多聊天记录
  if (e.scrollTop < 50) {
    zPagingRef.value.doChatRecordLoadMore();
    // queryChatMsg(channelInfo.channelId, pageParams.pageNum, pageParams.pageSize);
  }
});

/**
 * 查询聊天记录
 * @param channelId 频道ID
 * @param pageNum 第几页
 * @param pageSize 一页多少条数据
 */
const queryChatMsg = async (channelId: string, pageNum: number, pageSize: number) => {
  const params: any = {
    channelId: channelInfo.channelId,
    pageSize: pageParams.pageSize,
    pageNum: pageParams.pageNum,
  };
  await queryChatMessage(params).then((result: ChatMessagesInterface[]) => {
    if (result) {
      // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      zPagingRef.value.complete(result.reverse());
      pageParams.pageNum += 1;
    } else {
      zPagingRef.value.complete(false);
    }
  });
};

// 加载数据
const scroll = async () => {
  // console.log('加载数据');
};
// 滚动到顶部
const scrollTop = async () => {
  console.log('滚动到顶部');
  pageParams.pageNum += 1;
  queryChatMsg(channelInfo.channelId, pageParams.pageNum, pageParams.pageSize);
};
// 滚动到底部
const scrollBottom = async () => {
  console.log('滚动到底部');
};
</script>

<style scoped lang="scss">
@import './chat-base.scss';
.chat-base {
  height: 100vh;
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
}

.iconfont {
  font-size: 14px;
  color: $--jjext-color-primary;
}
</style>
