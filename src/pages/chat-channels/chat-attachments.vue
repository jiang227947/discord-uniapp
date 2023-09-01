<template>
  <view>
    <!--附件消息-->
    <view class="attachments" v-if="attachments.fileType !== ''">
      <!--图片-->
      <template v-if="attachments.fileType === 'image'">
        <view class="image-h">
          <image mode="scaleToFill" :src="attachments.path" class="image"></image>
        </view>
      </template>
      <!--文本-->
      <template v-else-if="attachments.fileType === 'text'">
        <view class="text">
          <code class="code">{{ attachments.fileText }}</code>
        </view>
      </template>
      <!--音频-->
      <template v-else-if="attachments.fileType === 'audio'">
        <view class="audio">
          <p class="audio-name">{{ attachments.name }}</p>
          <audio
            style="text-align: left"
            :src="attachments.path"
            :poster="''"
            :name="attachments.name"
            :author="''"
            :action="'pause'"
            controls
          ></audio>
        </view>
      </template>
      <!--其他-->
      <template v-else>
        <span></span>
      </template>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { ChatAttachmentsInterface } from '@/shared/interface/chat-channels';
/**
 * 附件信息
 * TS写法，如果需要设置默认值，需要在外层包装withDefaults函数，接受两个参数，全是对象，设置默认值的时候，如果是一个复杂的对象，
 * 则需要列举出它的所有键值对，并将结果返回才行
 */
withDefaults(
  defineProps<{
    attachments: ChatAttachmentsInterface;
  }>(),
  {}
);
</script>

<style scoped lang="scss">
@import '../../shared/style.scss';

/*附件消息*/
.attachments {
  //width: 100px;
  border-radius: 6px;

  /*图片*/
  .image-h {
    //width: 200px;
    //height: 200px;

    .image {
      width: auto;
      height: auto;
      max-width: 250px;
      max-height: 250px;
      cursor: pointer;
    }
  }

  /*文本*/
  .text {
    max-width: 90%;
    height: 220px;
    border-radius: 4px;
    padding: 10px 0;
    font-size: 0.75rem;
    white-space: pre-wrap;
    background-clip: border-box;

    .code {
      display: block;
      overflow: auto;
      max-height: 200px;
      padding: 0.5em;
      border-radius: 4px;
      font-family: Arial, 'Hiragino Sans GB', 'Microsoft Yahei', 'Microsoft Sans Serif', sans-serif;
      font-size: 0.875rem;
      line-height: 1.125rem;
      text-indent: 0;
      white-space: pre-wrap;
      background-color: $--jjext-color-primary;
      border: 1px solid $--jjext-color-base1;
    }
  }

  /*媒体*/
  .audio {
    min-width: 100px;

    .audio-name {
      cursor: text;
      user-select: text;
      color: $--gold;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
    }

    audio {
      width: 100%;
      max-width: 500px;
      height: 30px;
    }

    audio::-webkit-media-controls-panel {
      height: 30px;
      outline: none;
      border: none;
      background-color: $--user-int;
    }

    .download {
      display: block;
      width: 2rem;
    }
  }
}
</style>
