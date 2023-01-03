<template>
  <view class="lxColumn" style="width: 100vw;">
    <view class="mineCard lxCenterRow" style="margin-bottom: 16px;">
      <image class="avatar" @click="tapAvatar" :src="user.avatar || '/static/defaultAvatar.png'" mode="aspectFill" />
      <view class="lxColumn" style="margin-left: 10px;">
        <view class="lxCenterRow">
          <text class="lx333" style="font-size: 17px;margin-right: 5px;">{{user.nickName || '微信用户'}}</text>
          <image v-if="user.isVip" src="/static/vip.png" mode="aspectFit" style="width: 16px;height: 16px;"></image>
        </view>
        <text v-if="user.openid" class="lx999" style="font-size: 15px;margin-top: 3px;">id
          :{{user.openid.slice(0,15)}}</text>
      </view>
    </view>

    <MineCell title="我的积分" icon="/static/jifen.png" desc="100" @tapMineCell="tapMineCell" />
    <MineCell title="我的优惠券" icon="/static/coupon.png" @tapMineCell="tapMineCell" />
    <MineCell title="我的活动" icon="/static/baoming.png" @tapMineCell="tapMineCell" />
    <MineCell title="我的组织" icon="/static/club.png" @tapMineCell="tapMineCell" />
    <MineCell title="更多功能" icon="/static/moreFunc.png" @tapMineCell="tapMineCell" />

  </view>
</template>

<script setup>
  import MineCell from '/pages/mine/mineCell.vue'
  import {
    ref,
    computed
  } from 'vue';
  let user = ref(getApp().globalData.user)

  const genderIcon = computed(() => {
    return user.value.isGirl === 1 ? "/static/woman.png" : "/static/man.png"
  })

  function tapMineCell(e) {
    if (e === '我的积分') {
      // uni.navigateTo({
      //   url: '/pages/jifenHome/jifenHome'
      // })
      getApp().toast('后台结算中...')
    } else if (e === '我的优惠券') {
      uni.navigateTo({
        url: '/pages/couponList/couponList'
      })
    } else if (e === '我的活动') { //我发起的 我参与的
      uni.navigateTo({
        url: '/pages/myActivitys/myActivitys'
      })
    } else if (e === '我的组织') {
      uni.navigateTo({
        url: '/pages/myClubs/myClubs' // 我创办的 我参与的
      })
    } else if (e === '更多功能') {
      uni.navigateTo({
        url: '/pages/moreFunc/moreFunc'
      })
    }
  }
</script>

<style lang="scss">
  page {
    padding-top: 5vw;
    background-color: #f6f6f6;
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 40px;
  }
</style>
