<template>
  <view class="infoListCell">
    <view class="lxColumn infoCard">
      <view class="infoRow lxCenterRow">
        <text class="lx666">活动时间</text> <text class="lx333">{{ dateStr }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动地点</text> <text class="lx333">{{ tz.qiuguanName || '-' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  const dateStr = computed(() => {
    return `${tz.value.date}  ${tz.value.time}`
  })
</script>

<style lang="scss">
  .infoRow {
    justify-content: space-between;
    min-height: 70rpx;
  }

  .infoCard {
    background-color: white;
    width: 90vw;
    border-radius: 10px;
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.02);
    margin-top: 20px;
    font-size: 15px;
  }
</style>
