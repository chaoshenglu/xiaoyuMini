<template>
  <view class="lxColumn" style="width: 100vw;">
    <view class="mineCard lxCenterRow">
      <image class="avatar" :src="user.avatar || '/static/defaultAvatar.png'" mode="aspectFill" @click="getWxName">
      </image>
      <view class="lxColumn" style="margin-left: 10px;">
        <text v-if="user.nickName" class="lx333" style="font-size: 17px;">{{user.nickName}}</text>
        <button v-else @click="getWxName">点我授权微信头像昵称</button>
        <text v-if="user.nickName" class="lx999" style="font-size: 15px;margin-top: 6px;">id :
          {{user.openid.slice(0,15)}}</text>
      </view>
    </view>
    <view style="height: 16px;"></view>
    <view class="mineCard lxCenterRow" style="justify-content: space-between;" @click="tapCoupon">
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
  let user = getApp().globalData.user

  function tapCoupon() {
    uni.navigateTo({
      url: '/pages/couponList/couponList'
    })
  }

  function getWxName() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        console.log(JSON.stringify(res.userInfo, null, 2))
        let nickName = res.userInfo.nickName
        let avatarUrl = res.userInfo.avatarUrl
        user.nickName = nickName
        user.avatar = avatarUrl
        getApp().globalData.user = user
        setUserNameAvatar()
      }
    })
  }

  function setUserNameAvatar(nickName, avatarUrl) {
    let param = {
      nickName: nickName,
      avatar: avatarUrl,
      openid: user.openid
    }
    if (getApp().globalData.penddingGift) {
      param.gift = getApp().globalData.penddingGift.money
    }
    getApp().get('user/setUserNameAvatar', param).then(res => {
      console.log('⭕️', res)
      console.log('⭕⭕️', user)
      uni.setStorageSync('user', user)
      if (getApp().globalData.penddingGift) {
        let gift = getApp().globalData.penddingGift
        getApp().globalData.penddingGift = null
        uni.showModal({
          title: '🥳 🥳 🥳',
          showCancel: false,
          content: `恭喜你,获得了价值${gift.money}元的优惠券，订单结算时将自动抵扣`
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
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
