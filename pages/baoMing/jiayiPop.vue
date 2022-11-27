<template>
  <view class="baoMingPop">
    <view style="padding: 16px;">
      <view class="lxCenterRow" style="margin-top: 6px;margin-bottom: 10px;">
        <text class="lx333" style="margin-right: 10px;flex-shrink:0;">昵称</text>
        <input type="text" @input="onInput" placeholder="请输入TA的昵称" maxlength="4">
      </view>
      <view style="background-color: #ededed;margin-left: 40px;margin-right: 30px;height: 1px;" />
      <view class="lxCenterRow" style="justify-content: space-between;margin-top: 14px;">
        <view class="lxCenterRow">
          <text class="lx333" style="font-size: 16px;margin-right: 4px;">性别</text>
          <radio-group @change="radioChange" class="lxCenterRow">
            <view v-for="(item, index) in items" :key="item.value" class="lxCenterRow">
              <radio color="#4685F3" style="margin-left: 6px;" :value="item.value" :checked="index === current" />
              <view class="lx666">{{item.name}}</view>
            </view>
          </radio-group>
        </view>
      </view>
    </view>
    <button type="default" @click="tapConfirm" class="confirmBtn">确定</button>
    <view style="height: 12px;" />
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  let current = ref(0)
  let nickName = ref('')
  const emit = defineEmits(['closeJiaYiPop'])
  const props = defineProps(['tiezi'])
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

  function onInput(e) {
    nickName.value = e.detail.value
  }

  function tapConfirm() {
    let user = {
      nickName: nickName.value,
      avatar: getApp().globalData.user.avatar,
      isGirl: current.value,
      isJiaYi: 1,
      openid: getApp().globalData.openid,
      status: 1, //1已报名2已取消3已飞机
      tieziId: props.tiezi.id,
    }
    addTZRecord(user)
  }

  function addTZRecord(user) {
    let param = {
      openid: user.openid,
      tieziId: props.tiezi.id,
      nickName: getApp().globalData.user.nickName,
      onNickName: user.nickName,
      actionType: 2, //1报名 2为加一报名 3.为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
    }
    getApp().post('tz_record/addTZRecord', param).then(res => {
      if (res.code === 1) {
        baoMing_addTZPerson(user)
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function baoMing_addTZPerson(user) {
    getApp().post('tz_person/addTZPerson', user).then(res => {
      emit('closeJiaYiPop')
      handleRes(res)
    }).catch(err => {
      emit('closeJiaYiPop')
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
    current.value = e.detail.value
  }
</script>

<style lang="scss">
  .baoMingPop {
    width: 66vw;
    background-color: white;
    border-radius: 6px;
  }

  .confirmBtn {
    background-color: #4685F3 !important;
    color: white !important;
    transform: scale(0.88);
    width: 66vw;
  }
</style>
