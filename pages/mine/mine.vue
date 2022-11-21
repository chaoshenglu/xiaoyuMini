<template>
  <view class="lxColumn" style="width: 100vw;">
    <view class="mineCard lxCenterRow">
      <image class="avatar" :src="user.avatar || '/static/defaultAvatar.png'" mode="aspectFill"></image>
      <view class="lxColumn" style="margin-left: 10px;">
        <text class="lx333" style="font-size: 17px;">张三（微信昵称：张三丰）</text>
        <text class="lx999" style="font-size: 15px;margin-top: 6px;">id : {{user.openid.slice(0,15)}}</text>
      </view>
    </view>
    <view style="height: 16px;"></view>
    <view class="mineCard lxCenterRow" style="justify-content: space-between;" @click="alertRole">
      <view class="lxCenterRow">
        <image src="/static/coupon.png" mode="aspectFit" class="rowIcon"></image>
        <text class="lx666" style="font-size: 16px;">我的优惠券</text>
      </view>
      <uni-icons color="#666666" type="right"></uni-icons>
    </view>

    <view class="mineCard lxCenterRow" style="justify-content: space-between;margin-top: 10px;" @click="clear">
      <view class="lxCenterRow">
        <image src="/static/clear.png" mode="aspectFit" class="rowIcon"></image>
        <text class="lx666" style="font-size: 16px;">清除缓存</text>
      </view>
      <uni-icons color="#666666" type="right"></uni-icons>
    </view>

  </view>
</template>

<script setup>
  const user = getApp().globalData.user
</script>

<style lang="scss">
  page {
    padding-top: 5vw;
    background-color: #f6f6f6;
  }

  .mineCard {
    background-color: white;
    width: 86vw;
    border-radius: 20rpx;
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-left: 4vw;
  }

  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 40px;
  }

  .rowIcon {
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-left: 4px;
    margin-bottom: 1px;
  }
</style>
