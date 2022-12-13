<template>
  <view class="lxColumn" style="width: 100vw;">
    <view class="mineCard lxCenterRow" style="margin-bottom: 16px;">
      <image class="avatar" @click="tapAvatar" :src="user.avatar || '/static/defaultAvatar.png'" mode="aspectFill" />
      <text v-if="user.nickName && !user.avatar" class="lx333" style="margin-left: 10px;">{{user.nickName}}</text>
      <button v-if="!user.avatar" class="setAvatar" @chooseavatar="chooseHead" open-type="chooseAvatar">设置头像</button>

      <button v-if="!user.nickName" class="setAvatar" @click="alert2setNickName">设置昵称</button>

      <view class="lxColumn" style="margin-left: 10px;" v-if="user.nickName && user.avatar">
        <view class="lxCenterRow">
          <text class="lx333" style="font-size: 17px;margin-right: 5px;">{{user.nickName}}</text>
          <image v-if="user.isVip" src="/static/vip.png" mode="aspectFit" style="width: 16px;height: 16px;"></image>
        </view>
        <text v-if="user.openid" class="lx999" style="font-size: 15px;margin-top: 3px;">id
          :{{user.openid.slice(0,15)}}</text>
      </view>
    </view>

    <MineCell title="我的积分" icon="/static/jifen.png" desc="100" @tapMineCell="tapMineCell" />
    <MineCell title="我的优惠券" icon="/static/coupon.png" @tapMineCell="tapMineCell" />
    <!-- <MineCell title="我的活动" icon="/static/baoming.png" @tapMineCell="tapMineCell" /> -->
    <!-- <MineCell title="我的组织" icon="/static/club.png" @tapMineCell="tapMineCell" /> -->
    <!-- <MineCell title="更多功能" icon="/static/moreFunc.png" @tapMineCell="tapMineCell" /> -->
    <MineCell title="清除缓存" icon="/static/clear.png" @tapMineCell="tapMineCell" />
    <MineCell title="隐私设置" icon="/static/privacy.png" @tapMineCell="tapMineCell" />

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

    } else if (e === '清除缓存') {
      clearCache()
    } else if (e === '隐私设置') {
      uni.navigateTo({
        url: '/pages/privacy/privacy'
      })
    }
  }

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
      uni.hideLoading()
      getApp().loginAndGetOpenId()
    }, 500)
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
    let random = getApp().randomNum(0, 999999)
    let ossConfig = getApp().globalData.ossConfig
    ossConfig.key = getApp().globalData.openid + `_${random}.jpg`
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

  function tapAvatar() {
    uni.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'], //从相册选择
      success: function(res) {
        let avatarUrl = res.tempFilePaths[0]
        let detail = {
          avatarUrl
        }
        chooseHead({
          detail
        })
      }
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
