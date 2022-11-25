<template>
  <view class="lxColumn" style="width: 100vw;">
    <view class="mineCard lxCenterRow">
      <image class="avatar" :src="user.avatar || '/static/defaultAvatar.png'" mode="aspectFill">
      </image>
      <text v-if="user.nickName && !user.avatar" class="lx333" style="margin-left: 10px;">{{user.nickName}}</text>
      <button v-if="!user.avatar" class="setAvatar" @chooseavatar="chooseHead" open-type="chooseAvatar">设置头像</button>

      <button v-if="!user.nickName" class="setAvatar" @click="alert2setNickName">设置昵称</button>

      <view class="lxColumn" style="margin-left: 10px;" v-if="user.nickName && user.avatar">
        <view class="lxCenterRow">
          <text class="lx333" style="font-size: 17px;margin-right: 5px;">{{user.nickName}}</text>
          <image src="/static/vip.png" mode="aspectFit" style="width: 16px;height: 16px;"></image>
        </view>
        <text v-if="user.openid" class="lx999" style="font-size: 15px;margin-top: 3px;">id
          :{{user.openid.slice(0,15)}}</text>
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
  import {
    ref,
    computed
  } from 'vue';
  let user = ref(getApp().globalData.user)

  const genderIcon = computed(() => {
    return user.value.isGirl === 1 ? "/static/woman.png" : "/static/man.png"
  })

  function clear() {
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
      uni.hideLoading()
      getApp().loginAndGetOpenId()
    }, 500)
  }

  function tapCoupon() {
    uni.navigateTo({
      url: '/pages/couponList/couponList'
    })
  }

  function chooseHead(e) {
    uni.showLoading({
      title: '正在上传',
      mask: true
    })
    wx.compressImage({
      src: e.detail.avatarUrl,
      compressedWidth: 112,
      compressHeight: 112,
      quality: 90,
      success: res => {
        upload(res.tempFilePath)
        // uni.getFileSystemManager().readFile({
        //   filePath: res.tempFilePath,
        //   encoding: 'base64',
        //   success: resp => {
        //     setAvatar('data:image/jpeg;base64,' + resp.data)
        //   }
        // })
      },
      fail: (err) => {
        uni.hideLoading()
        getApp().toastAndConsoleSystemError(err)
      }
    })
  }

  function upload(tempFilePath) {
    let ossConfig = getApp().globalData.ossConfig
    ossConfig.key = getApp().globalData.openid + '.jpg'
    let host = 'https://xiaoyu-mini.oss-cn-guangzhou.aliyuncs.com/'
    uni.uploadFile({
      url: host,
      filePath: tempFilePath,
      name: 'file',
      formData: ossConfig,
      success: resp => {
        uni.hideLoading()
        setAvatar(host + ossConfig.key)
      },
      fail: error => {
        uni.hideLoading()
        getApp().toastAndConsoleSystemError(err)
      }
    })
  }

  function alert2setNickName() {
    uni.showModal({
      title: '请输入昵称（限四字以内）',
      editable: true,
      placeholderText: '请尽量与群昵称相同或相似',
      success: (res) => {
        if (res.confirm && res.content) {
          if (res.content.length === 0 || res.content.length > 4) {
            getApp().toast('请输入四字以内的昵称')
            return
          }
          setNickName(res.content)
        }
      }
    })
  }

  function setNickName(nickName) {
    let param = {
      nickName: nickName,
      openid: user.value.openid
    }
    if (getApp().globalData.penddingGift && user.value.avatar) {
      param.gift = getApp().globalData.penddingGift.money
    }
    getApp().post('user/updateUserInfo', param).then(res => {
      user.value.nickName = nickName
      uni.setStorageSync('user', user.value)
      handlePenddingGift()
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function setAvatar(avatar) {
    let param = {
      avatar: avatar,
      openid: user.value.openid
    }
    if (getApp().globalData.penddingGift && user.value.nickName) {
      param.gift = getApp().globalData.penddingGift.money
    }
    getApp().post('user/updateUserInfo', param).then(res => {
      user.value.avatar = avatar
      uni.setStorageSync('user', user.value)
      handlePenddingGift()
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function handlePenddingGift() {
    if (getApp().globalData.penddingGift && user.value.avatar && user.value.nickName) {
      let gift = getApp().globalData.penddingGift
      getApp().globalData.penddingGift = null
      uni.showModal({
        title: '🥳 🥳 🥳',
        showCancel: false,
        content: `恭喜你,获得了价值${gift.money}元的优惠券，订单结算时将自动抵扣`
      })
    }
  }
</script>

<style lang="scss">
  page {
    padding-top: 5vw;
    background-color: #f6f6f6;
  }

  .setAvatar {
    transform: scale(0.9);
    margin-right: 0px !important;
    margin-left: 8px !important;
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
    width: 56px;
    height: 56px;
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
