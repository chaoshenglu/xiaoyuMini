<template>
  <view class="baoMingPop">
    <text>报名信息</text>
    <view class="lxCenterRow" style="justify-content: space-between;margin-top: 10px;">
      <view class="lxCenterRow">
        <text class="lx666" style="font-size: 16px;margin-right: 4px;">{{user.nickName}}</text>
        <radio-group @change="radioChange" class="lxCenterRow">
          <view v-for="(item, index) in items" :key="item.value" class="lxCenterRow">
            <radio color="#4685F3" style="margin-left: 6px;" :value="item.value" :checked="index === current" />
            <view>{{item.name}}</view>
          </view>
        </radio-group>
      </view>
    </view>
    <button type="default" @click="tapConfirm">确定</button>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  let current = ref(getApp().globalData.user.isGirl || 0)
  const emit = defineEmits(['closeBaoMingPop'])
  let user = ref(getApp().globalData.user)

  const items = [{
      value: 0,
      name: '女'
    },
    {
      value: 1,
      name: '男'
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
    user.gift = 0
    user.isGirl = current.value
    getApp().get('tz_person/addTZPerson', user).then(res => {
      emit('closeBaoMingPop')
      handleRes(res)
    }).catch(err => {
      emit('closeBaoMingPop')
      uni.showToast({
        title: '系统出错',
        icon: 'error'
      })
    })
  }

  function handleRes(res) {
    if (res.code === 1) {
      uni.showToast({
        title: '报名成功',
        icon: 'success'
      })
    } else {
      uni.showToast({
        title: '系统出错',
        icon: 'error'
      })
    }
  }

  function radioChange(e) {
    console.log(e.detail.value)

  }
</script>

<style lang="scss">
  .baoMingPop {
    width: 66vw;
    height: 150px;
    background-color: white;
    border-radius: 6px;
    padding: 10px;
  }
</style>
