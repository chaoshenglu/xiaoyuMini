<template>
  <view class="listCell">
    <view class="lxColumn lxListCell">
      <view class="shopInfoRow lxCenterRow">
        <text class="lx666">客户编码</text> <text class="lx333">{{ tiezi || '-' }}</text>
      </view>

      <view class="shopInfoRow lxCenterRow">
        <text class="lx666">店铺名称</text> <text class="lx333">{{ tiezi || '-' }}</text>
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
</script>

<style lang="scss">

</style>
