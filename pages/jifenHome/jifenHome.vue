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
    <view class="card lxColumn" style="padding-top: 5px;">

      <view class="lxCenterRow gameCell">
        <view class="lxCenterRow" style="margin-left:8px;">
          <image src="/static/choujiang.png" style="width: 34px;height: 50px;" mode="aspectFit"></image>
          <view class="lxColumn" style="margin-left: 14px;">
            <text style="color: #222222; font-size: 15px;">天天抽奖</text>
            <view style="height: 4px;"></view>
            <text style="color: #999999; font-size: 13px;">最高得10元立减金</text>
          </view>
        </view>
        <uni-icons color="#999999" type="right" size="18"></uni-icons>
      </view>

      <view class="lxCenterRow gameCell">
        <view class="lxCenterRow">
          <image src="/static/duihuan.png" style="width: 50px;height: 50px;" mode="aspectFit"></image>
          <view class="lxColumn" style="margin-left: 7px;">
            <text style="color: #222222; font-size: 15px;">积分兑换优惠券</text>
            <view style="height: 4px;"></view>
            <text style="color: #999999; font-size: 13px;">10积分价值1元</text>
          </view>
        </view>
        <uni-icons color="#999999" type="right" size="18"></uni-icons>
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
    height: 60vw;
    position: fixed;
    top: 0px;
    z-index: -1;
  }

  .gameCell {
    margin-left: 15px;
    margin-top: 15px;
    padding-right: 20px;
    justify-content: space-between;
  }

  .card {
    background-color: white;
    border-radius: 10px;
    width: 92vw;
    margin-left: 4vw;
    height: 150px;
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
