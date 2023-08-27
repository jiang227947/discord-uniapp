<template>
  <view v-if="loading" class="theme-card p-2 flex justify-center items-center">
    <view class="ml-2 text-md">加载中...</view>
  </view>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
}>();
</script>
