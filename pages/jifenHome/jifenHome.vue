<template>
  <view>

    <image class="bg" src="/static/jifenBg.png" mode="aspectFill"></image>
    <view class="lxCenterRow jifenAndSignBtn">
      <view class="lxColumn" style="width: 100px;">
        <text style="color: white;font-size: 30px;font-weight: bold;">{{jifen}}</text>
        <view class="lxCenterRow">
          <uni-icons type="help" color="#fff"></uni-icons>
          <text style="color: white;font-size: 11px;margin-left: 2px;">积分说明</text>
        </view>
      </view>

      <view class="lxCenterC btn">已签到</view>
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  let jifen = ref(0)

  import {
    onLoad
  } from "@dcloudio/uni-app"

  onLoad((option) => {
    jifen.value = getApp().globalData.user.jifen || 0
  })
</script>

<style lang="scss">
  .bg {
    width: 100vw;
    height: 66.67vw;
    position: fixed;
    top: 0px;
    z-index: -1;
  }

  .btn {
    background-color: white;
    border-radius: 17px;
    width: 80px;
    height: 34px;
    color: #999999;
    font-size: 14px;
  }

  .jifenAndSignBtn {
    margin-left: 30px;
    margin-right: 26px;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-between;
  }
</style>
