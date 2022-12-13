<template>
  <view class="lxColumn">
    <view class="lxCenterRow">
      <text>保留我的报名记录</text>
      <switch :checked="checkedBM===1" color="#4685F3" />
    </view>


    <uni-card title="基础卡片" sub-title="副标题" @click="onClick">
      <view class="lxCenterRow">
        <text>保留我的活动记录</text>
        <switch :checked="checkedHD===1" color="#4685F3" />
      </view>
    </uni-card>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'

  import {
    onLoad
  } from "@dcloudio/uni-app"

  const checkedBM = ref(1)
  const checkedHD = ref(1)

  onLoad((option) => {

  })
</script>

<style lang="scss">

</style>
