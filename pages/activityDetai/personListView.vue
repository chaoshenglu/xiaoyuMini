<template>
  <view class="lxCenterColumn">
    <view class="lxCenterRow">
      <image class="avatar" :src="user.avatar || '/static/defaultAvatar.png'" mode="aspectFill" />
      <text v-if="user.avatar" class="lx333" style="margin-left: 10px;">{{user.nickName}}</text>
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
</script>

<style lang="scss">

</style>
