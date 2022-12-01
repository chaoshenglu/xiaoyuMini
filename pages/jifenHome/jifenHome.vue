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
    <view class="card lxColumn">

      <view class="lxCenterRow" style="margin-left: 16px;margin-top: 6px;">
        <image src="/static/choujiang.png" style="width: 30px;height: 50px;" mode="aspectFit"></image>
        <view class="lxColumn" style="margin-left: 10px;">
          <text>天天抽奖</text>
          <text>最高得10元立减金</text>
        </view>
      </view>

      <view class="lxCenterRow" style="margin-left: 12px;margin-top: 6px;">
        <image src="/static/duihuan.png" style="width: 44px;height: 44px;" mode="aspectFit"></image>
        <view class="lxColumn">
          <text>积分兑换优惠券</text>
          <text>10积分价值1元</text>
        </view>
      </view>

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
  page {
    background-color: #f6f6f6;
  }

  .bg {
    width: 100vw;
    height: 66.67vw;
    position: fixed;
    top: 0px;
    z-index: -1;
  }

  .card {
    background-color: white;
    border-radius: 10px;
    width: 92vw;
    margin-left: 4vw;
    height: 170px;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.02);
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
