<template>
  <view class="baoMingPop">
    <text class="lx333" style="font-size: 18px;font-weight: 500;">报名信息</text>
    <view class="lxCenterRow" style="justify-content: space-between;margin-top: 14px;margin-bottom: 16px;">
      <view class="lxCenterRow">
        <text class="lx333" style="font-size: 16px;margin-right: 4px;">{{user.nickName}}</text>
        <radio-group @change="radioChange" class="lxCenterRow">
          <view v-for="(item, index) in items" :key="item.value" class="lxCenterRow">
            <radio color="#4685F3" style="margin-left: 6px;" :value="item.value" :checked="index === current" />
            <view class="lx666">{{item.name}}</view>
          </view>
        </radio-group>
      </view>
    </view>
    <button type="default" @click="tapConfirm" class="confirmBtn">确定</button>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  let current = ref(getApp().globalData.user.isGirl === 1 ? 0 : 1)
  const emit = defineEmits(['closeBaoMingPop'])
  let user = ref(getApp().globalData.user)

  const items = [{
      value: 0,
      name: '男'
    },
    {
      value: 1,
      name: '女'
    }
  ]

  function tapConfirm() {
    let user = getApp().globalData.user
    if (user.gift == null || user.gift == undefined) {
      uni.showToast({
        title: 'gift未初始化',
        icon: 'error'
      })
      return
    }
    user.isGirl = current.value
    addTZRecord(user)
    updateUserGender(user)
  }

  function addTZRecord(user) {
    let param = {
      openid: user.openid,
      name: user.name,
      nickName: user.nickName,
      actionType: 1,
    }
    getApp().get('user/addTZRecord', param).then(res => {
      if (res.code === 1) {
        baoMing_addTZPerson(user)
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function updateUserGender(user) {
    let param = {
      isGirl: user.isGirl,
      openid: user.openid
    }
    getApp().get('user/updateUser', param).then(res => {
      if (res.code === 1) {
        uni.setStorageSync('user', user)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function baoMing_addTZPerson(user) {
    getApp().get('tz_person/addTZPerson', user).then(res => {
      emit('closeBaoMingPop')
      handleRes(res)
    }).catch(err => {
      emit('closeBaoMingPop')
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function handleRes(res) {
    if (res.code === 1) {
      uni.showToast({
        title: '报名成功',
        icon: 'success'
      })
    } else {
      getApp().toastAndConsoleSystemError(res)
    }
  }

  function radioChange(e) {
    console.log('e.detail.value', e.detail.value)
    current.value = e.detail.value
  }
</script>

<style lang="scss">
  .baoMingPop {
    width: 66vw;
    background-color: white;
    border-radius: 6px;
    padding: 16px;
  }

  .confirmBtn {
    margin-top: 15px;
    background-color: #4685F3 !important;
    color: white !important;
  }
</style>
