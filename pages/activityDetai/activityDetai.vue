<template>
  <view class="lxColumn">
    <view class="topBar">
      <lgd-tab :tabIndex="tabIndex" :tabValue="tabs" underlineColor="#4685F3" :fontSize="15"
        @getIndex="didChangeTabIndex" />
    </view>
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

  let tabs = ref(['活动信息', '报名人员', '操作记录', '活动费用'])
  let tabIndex = ref(0)

  onLoad((option) => {

  })

  function didChangeTabIndex(e) {
    tabIndex.value = e
  }
</script>

<style lang="scss">
  page {
    padding-top: 32px;
  }

  .topBar {
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 32px;
    box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.1);
    padding-top: 4px;
    z-index: 99997;
  }
</style>
