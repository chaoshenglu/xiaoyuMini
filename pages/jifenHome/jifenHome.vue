<template>
  <view>
    <image class="bg" src="/static/jifenBg.png" mode="aspectFill"></image>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'

  import {
    onLoad
  } from "@dcloudio/uni-app"

  onLoad((option) => {

  })
</script>

<style lang="scss">
  .bg {
    width: 100vw;
    height: 66.67vw;
    position: fixed;
    top: 0px;
  }
</style>
