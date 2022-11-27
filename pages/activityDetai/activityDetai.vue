<template>
  <view>
    <lgd-tab v-model="tabIndex" :tabValue="tabs" underlineColor="#4685F3" fontSize="14" background="#f6f6f6" />
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  let tabs = ref(['活动信息', '报名人员', '操作记录', '活动费用'])
  let tabIndex = ref(0)
</script>

<style lang="scss">

</style>
