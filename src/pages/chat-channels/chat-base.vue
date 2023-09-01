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
                      <ChatAttachments
                        :attachments="item.attachments"
                        v-if="item.attachments"
                      ></ChatAttachments>
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
                    <ChatAttachments
                      :attachments="item.attachments"
                      v-if="item.attachments"
                    ></ChatAttachments>
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
            <button type="submit" class="send-button" title="send" @click="send()">
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
import { onLoad, onPageScroll, onUnload } from '@dcloudio/uni-app';
import { getFileData, queryChatMessage } from '@/core/api-service/api/chat.api';
import type {
  ChatAttachmentsInterface,
  ChatMessageTypeInterface,
  ChatMessagesInterface,
} from '@/shared/interface/chat-channels';
import { PageParams } from '@/shared/model/pageParms';
import {
  ChatChannelsMessageTypeEnum,
  ChatMessagesTypeEnum,
} from '@/shared/enum/chat-channels.enum';
import { onMounted } from 'vue';
import ZPaging from '../../uni_modules/z-paging/components/z-paging/z-paging.vue';
import ChatAttachments from './chat-attachments.vue';
import { IMAGE_TYPE_CONST, MEDIA_TYPE_CONST, TEXT_TYPE_CONST } from '@/shared/const/commou.const';
import { CommonUtil } from '@/utils/commonUtil';
import { MessageEmitterService } from '@/shared/service/Message.service';
import type { Emitter } from 'mitt';
import { SocketIoService } from '@/core/service/socketIoService';
// @ts-ignore
import io from '@hyoga/uni-socket.io';
import type { Socket } from 'socket.io-client';

// 标题
const title: Ref<string> = ref('');
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
// 订阅流
let messageEmitter: Emitter<any>;
// socket.io
let socketIo: Socket;

onLoad(async (option: any) => {
  console.log('option', option);
  title.value = option.name;
  channelInfo.channelId = option.channelId;
});
onMounted(() => {
  if (!messageEmitter) {
    messageEmitter = new MessageEmitterService().messagesEmitter;
  }
  if (!socketIo) {
    console.log(io);
    
    io(`ws://127.0.0.1:3011/`);
    // const $socketIo = new SocketIoService(channelInfo.channelId);
    // console.log('socketIo', $socketIo);
    // $socketIo.connect();
    // socketIo = $socketIo.socketIo;
  }
});
onUnload(() => {
  console.log('onUnload');
});
onPageScroll(async (e: any) => {
  //如果滚动到顶部，触发加载更多聊天记录
  if (e.scrollTop < 50) {
    zPagingRef.value.doChatRecordLoadMore();
    // queryChatMsg(channelInfo.channelId, pageParams.pageNum, pageParams.pageSize);
  }
});

/**
 * 发送消息
 */
const send = () => {
  // 判断空字符 判断未进入房间禁止发消息
  if (textValue.value === '' && !channelInfo.channelId) {
    return;
  }
  socketIo.emit(ChatChannelsMessageTypeEnum.publicMessage, {}, (response: any) => {
    console.log(response);
  });
};

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
      // 附件格式转换
      const res = result.map((itm: ChatMessagesInterface) => {
        if (itm.attachments && typeof itm.attachments === 'string') {
          let attachments: ChatAttachmentsInterface = JSON.parse(itm.attachments);
          findFile(attachments).then((res) => {
            attachments = res;
          });
          itm.attachments = attachments;
        }
        return itm;
      });
      // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
      zPagingRef.value.complete(res.reverse());
      pageParams.pageNum += 1;
    } else {
      zPagingRef.value.complete(false);
    }
  });
};

/**
 * 获取文件展示类型
 * @param attachments 附件
 */
const findFile = async (attachments: ChatAttachmentsInterface) => {
  // 地址转换
  attachments.path = CommonUtil.pathFmt(attachments.path);
  // 图片
  if (IMAGE_TYPE_CONST.indexOf(attachments.type) !== -1) {
    attachments.fileType = 'image';
  }
  // 音频
  if (MEDIA_TYPE_CONST.indexOf(attachments.type) !== -1) {
    attachments.fileType = 'audio';
  }
  // 文本
  if (TEXT_TYPE_CONST.indexOf(attachments.type) !== -1) {
    // 获取文本内容
    await getFileData(attachments.path).then((result) => {
      attachments.fileText = result as string;
    });
    attachments.fileType = 'text';
  }
  // console.log('attachments', attachments);
  return attachments;
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
