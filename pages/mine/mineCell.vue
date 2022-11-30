<template>
  <view class="mineCard lxCenterRow mineCell" @click="tapMineCell">
    <view class="lxCenterRow">
      <image :src="props.icon" mode="aspectFit" class="rowIcon"></image>
      <text class="lx666" style="font-size: 16px;">{{props.title}}</text>
    </view>
    <uni-icons color="#666666" type="right"></uni-icons>
  </view>
  <view>

  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  const props = defineProps(['title', 'icon'])
  const emit = defineEmits(['tapMineCell'])

  function tapMineCell() {
    emit('tapMineCell', props.title)
  }
</script>

<style lang="scss">
  .mineCell {
    margin-bottom: 10px;
    justify-content: space-between;
  }
</style>
