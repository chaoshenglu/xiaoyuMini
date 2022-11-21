<template>
  <view class="lxCenterC lxBottomBtn">
    {{props.title}}
  </view>
  <view>

  </view>
</template>

<script setup>
  import {
    onMounted,
    ref
  } from 'vue'
  const props = defineProps(['title'])
  let bottomOffset = ref(0)
  onMounted(() => {
    const safeAreaInsets = uni.getWindowInfo().safeAreaInsets || {}
    bottomOffset.value = safeAreaInsets.bottom || 34
  })
</script>

<style lang="scss">
  .lxBottomBtn {
    position: fixed;
    width: 94vw;
    height: 44px;
    background-color: #4685F3;
    font-size: 16px;
    color: white;
    left: 3vw;
    border-radius: 6px;
    bottom: var(--status-bar-height);
  }
</style>
