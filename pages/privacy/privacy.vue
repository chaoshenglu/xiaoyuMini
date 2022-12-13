<template>
  <view class="lxColumn" style="padding-left:15px;padding-top: 10px;">
    <view class="lxCenterRow" style="justify-content: space-between;">
      <text class="lx333">保留我的报名记录</text>
      <switch :checked="checkedBM===1" color="#4685F3" style="transform:scale(0.7)" />
    </view>
    <view class="lx100vwLine" style="margin-top: 10px;margin-bottom: 10px;" />
    <view class="lxCenterRow" style="justify-content: space-between;">
      <text class="lx333">保留我的活动记录</text>
      <switch :checked="checkedHD===1" color="#4685F3" style="transform:scale(0.7)" />
    </view>
    <view class="lx100vwLine" style="margin-top: 10px;margin-bottom: 10px;" />
    <text class="lx999"
      style="font-size: 13px;">注意，小程序所记录的特征码/头像/昵称并不会与微信号/手机号强关联，通常情况下，用户使用本程序，并不必担心隐私问题。若依然不想把个人的报名记录/活动记录保存在服务器，可取消勾选以上选项，并点击“保存”。</text>
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
