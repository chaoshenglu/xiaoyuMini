<template>
  <!-- <view class="lxCenterC lxBottomBtn">
    {{title}}
  </view> -->
  <view>

  </view>
</template>

<script setup>
  export default {
    name: "LXBottomBtn"
  }
  const props = defineProps(['title'])
</script>

<style lang="scss">
  .lxBottomBtn {
    position: fixed;
    width: 94vw;
    height: 40px;
    background-color: #4685F3;
    font-size: 16px;
    color: white;
  }
</style>
