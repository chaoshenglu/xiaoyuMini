<template>
  <view class="lxColumn">
    <view v-if="tiezi.isSettled === 1">
      已结算
    </view>
    <view v-else class="emptySettle lxCenterC">
      暂未结算
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    onMounted,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
</script>

<style lang="scss">
  .emptySettle {
    color: #999999;
    font-size: 15px;
    width: 100vw;
    height: 100vw;
  }
</style>
