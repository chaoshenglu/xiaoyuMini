<template>
  <view class="lxColumn">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatarImg" :src="valiFormData.avatar || '/static/defaultAvatar.png'"></image>
    </button>
    <view>
      <uni-forms ref="valiForm" :modelValue="valiFormData">
        <view class="lx100vwLine" />
        <uni-forms-item label="昵称" name="nickName">
          <input type="nickname" placeholder="请输入昵称" style="margin-top: 6px;" v-model="valiFormData.nickName" />
        </uni-forms-item>
        <view class="lx100vwLine" />
        <uni-forms-item label="性别" name="isGirl">
          <view style="margin-top: 5px;">
            <uni-data-checkbox v-model="valiFormData.isGirl" :localdata="genderArr">
            </uni-data-checkbox>
          </view>
        </uni-forms-item>
        <view class="lx100vwLine" />
      </uni-forms>
      <LXBottomBtn title="保存" @tapBottomBtn="save" />
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'

  import {
    onLoad
  } from "@dcloudio/uni-app"

  const valiFormData = ref({
    avatar: null,
    nickName: null,
    isGirl: null
  })

  const genderArr = [{
    value: 0,
    text: '男'
  }, {
    value: 1,
    text: '女'
  }]

  function onChooseAvatar(e) {
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
        valiFormData.value.avatar = host + ossConfig.key
      },
      fail: error => {
        uni.hideLoading()
        getApp().toastAndConsoleSystemError(err)
      }
    })
  }

  function save() {
    let param = valiFormData.value
    if (!param.avatar) {
      getApp().toast('请选择头像')
      return
    }
    if (!param.nickName) {
      getApp().toast('请填写昵称')
      return
    }
    if (param.isGirl === null) {
      getApp().toast('请选择性别')
      return
    }
    let user = getApp().globalData.user
    param.openid = user.openid
    getApp().post('user/updateUserInfo', param).then(res => {
      if (res.code === 1) {
        user.avatar = param.avatar
        user.nickName = param.nickName
        user.isGirl = param.isGirl
        uni.setStorageSync('user', user)
        console.log('getApp().globalData.user===>', getApp().globalData.user)
        getApp().toast('保存成功')
        setTimeout(function() {
          uni.navigateBack()
        }, 1000)
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  onLoad((option) => {
    let user = getApp().globalData.user
    valiFormData.value.avatar = user.avatar
    valiFormData.value.nickName = user.nickName
    valiFormData.value.isGirl = user.isGirl
  })
</script>

<style lang="scss">
  .avatar-wrapper {
    padding: 0;
    width: 56px !important;
    border-radius: 8px;
    border-style: none !important;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .uni-forms-item {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
    padding-left: 20px !important;
  }

  .uni-forms-item__label {
    font-weight: 400;
    color: #333333 !important;
    font-size: 16px !important;
  }

  button::after {
    border-style: none !important;
  }

  .avatarImg {
    display: block;
    width: 56px;
    height: 56px;
  }
</style>
