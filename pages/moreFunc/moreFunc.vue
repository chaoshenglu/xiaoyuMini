<template>
  <view class="lxColumn" style="width: 100vw;">
    <MineCell title="申请入驻" icon="/static/ruzhu.png" @tapMineCell="tapMineCell" />
    <MineCell title="清除缓存" icon="/static/clear.png" @tapMineCell="tapMineCell" />
    <MineCell title="隐私设置" icon="/static/privacy.png" @tapMineCell="tapMineCell" />
  </view>
</template>

<script setup>
  import MineCell from '/pages/mine/mineCell.vue'
  import {
    computed,
    ref
  } from 'vue'

  import {
    onLoad
  } from "@dcloudio/uni-app"

  onLoad((option) => {

  })

  function clearCache() {
    getApp().globalData.openid = null
    getApp().globalData.saveOpenIdTime = null
    getApp().globalData.user = null
    uni.showLoading({
      title: '正在清理'
    })
    try {
      uni.clearStorageSync()
    } catch (e) {
      console.log(eee)
    }
    setTimeout(() => {
      uni.navigateBack()
      uni.hideLoading()
      getApp().loginAndGetOpenId()
    }, 500)
  }

  function tapMineCell(e) {
    if (e === '申请入驻') {
      uni.navigateTo({
        url: '/pages/rzApply/rzApply'
      })
    } else if (e === '清除缓存') {
      clearCache()
    } else if (e === '隐私设置') {
      uni.navigateTo({
        url: '/pages/privacy/privacy'
      })
    }
  }
</script>

<style lang="scss">
  page {
    padding-top: 5vw;
    background-color: #f6f6f6;
  }
</style>
