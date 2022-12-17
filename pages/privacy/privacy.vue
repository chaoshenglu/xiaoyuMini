<template>
  <view class="lxColumn" style="padding-left:15px;padding-top: 10px;padding-right: 3px;">
    <view class="lxCenterRow" style="justify-content: space-between;">
      <text class="lx333">保留我的报名记录</text>
      <switch @change="changeBM" :checked="checkedBM===1" color="#4685F3" style="transform:scale(0.7)" />
    </view>
    <view class="lx100vwLine" style="margin-top: 10px;margin-bottom: 10px;" />
    <view class="lxCenterRow" style="justify-content: space-between;">
      <text class="lx333">保留我的活动记录</text>
      <switch @change="changeHD" :checked="checkedHD===1" color="#4685F3" style="transform:scale(0.7)" />
    </view>
    <view class="lx100vwLine" style="margin-top: 10px;margin-bottom: 10px;" />
    <text class="lx999"
      style="font-size: 13px;margin-right: 18px;">注意：小程序中的头像/昵称并不会与微信号强关联，用户使用本程序，并不必担心隐私问题。若仍不想把个人的报名记录/活动记录保存在服务器，可取消勾选以上选项，并点击“确定”。</text>
    <LXBottomBtn title="确定" @tapBottomBtn="save" />
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import dayjs from 'dayjs'
  import {
    onLoad
  } from "@dcloudio/uni-app"

  const checkedBM = ref(0)
  const checkedHD = ref(0)

  onLoad((option) => {
    let user = getApp().globalData.user
    checkedBM.value = user.bmRecord
    checkedHD.value = user.hdRecord
  })

  function changeBM(e) {
    checkedBM.value = e.detail.value ? 1 : 0
  }

  function changeHD(e) {
    checkedHD.value = e.detail.value ? 1 : 0
  }

  function save() {
    console.log(checkedBM.value, checkedHD.value)
    let user = getApp().globalData.user
    let param = {
      openid: user.openid,
      bmRecord: checkedBM.value,
      hdRecord: checkedHD.value
    }
    getApp().post('user/updateUserInfo', param).then(res => {
      if (res.data === 1) {
        user.bmRecord = checkedBM.value
        user.hdRecord = checkedHD.value
        uni.setStorageSync('user', user)
        let content = null
        if (checkedBM.value === 0 && checkedHD.value === 0) {
          content = '您的报名记录和活动记录将在活动结束后24小时内从服务器上自动删除'
        } else if (checkedBM.value === 0) {
          content = '您的报名记录将在活动结束后24小时内从服务器上自动删除'
        } else if (checkedHD.value === 0) {
          content = '您的活动记录将在活动结束后24小时内从服务器上自动删除'
        }
        alert(content)
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function anonymousOrNotTZPerson() {
    let day3Ago = dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss')
    let param = {
      openid: user.openid,
      time: day3Ago
    }
    if (checkedHD.value === 1) {
      let user = getApp().globalData.user
      param.nickName = user.nickName
      param.avatar = user.avatar
    }
    getApp().post('tz_person/anonymousOrNot', param).then(res => {

    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function anonymousOrNotTZRecord() {
    let day3Ago = dayjs().subtract(3, 'day').format('YYYY-MM-DD HH:mm:ss')
    let param = {
      openid: user.openid,
      time: day3Ago
    }
    if (checkedBM.value === 1) {
      let user = getApp().globalData.user
      param.nickName = user.nickName
    }
    getApp().post('tz_record/anonymousOrNot', param).then(res => {

    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function alert(content) {
    if (content) {
      uni.showModal({
        title: '操作成功',
        content: content,
        showCancel: false,
        success: res => {
          uni.navigateBack()
        }
      })
    } else {
      uni.navigateBack()
    }
  }
</script>
