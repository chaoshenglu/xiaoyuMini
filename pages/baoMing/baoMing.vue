<template>
  <view>
    <uni-popup ref="popup" type="center">
      <Gift @closePop="closePop" />
    </uni-popup>

    <uni-popup ref="bmPopup" type="center">
      <baoMingPop @closeBaoMingPop="closeBaoMingPop" />
      <view style="height: 20vh;" />
    </uni-popup>

    <uni-popup ref="jiayiPopup" type="center">
      <baoMingPop @closeBaoMingPop="closeBaoMingPop" />
      <view style="height: 20vh;" />
    </uni-popup>

    <view class="lxCenterR" style="margin-top: 8px;">
      <view class="smallTag lxCenterRow">
        <view class="smallBox" style="background-color: #4685F3;" />
        <text class="smallWord">男</text>
      </view>
      <view class="smallTag lxCenterRow">
        <view class="smallBox" style="background-color: #FD5FA9;" />
        <text class="smallWord">女</text>
      </view>
      <view class="smallTag lxCenterRow">
        <view class="smallBox" style="background-color: #FABA2C" />
        <text class="smallWord">VIP</text>
      </view>
      <view class="smallTag lxCenterRow">
        <view class="smallBox" style="background-color: #999999" />
        <text class="smallWord">排队</text>
      </view>
    </view>
    <view style="margin-left: 8px;margin-right: 8px;margin-top: 8px;">
      <uni-grid :column="4" :highlight="true" @change="change" :showBorder="false" :square="false">
        <uni-grid-item v-for="(person, index) in personArr" :index="index" :key="index">
          <view class="lxCenterR cell" :class="{ 'boyClass': person.isGirl === 0}" v-if="person.nickName">
            <image class="head" :src="person.avatar" mode="aspectFit"></image>
            <text v-if="person.nickName.length < 3" class="pname">{{person.nickName}}</text>
            <text v-else class="pname">{{person.nickName.slice(0,2)}}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <HalfBottomBtn title='报名' :isLeft="true" @tapBottomBtn="baoMing(0)" />
    <HalfBottomBtn title='报名+1' :isLeft="false" @tapBottomBtn="baoMing(1)" />
  </view>
</template>

<script setup>
  import Gift from '/pages/baoMing/gift.vue'
  import baoMingPop from '/pages/baoMing/baoMingPop.vue'

  import {
    ref
  } from 'vue'

  import {
    onLoad,
    onShow,
    onHide
  } from "@dcloudio/uni-app"

  const popup = ref(null)
  const jiayiPopup = ref(null)
  const bmPopup = ref(null)
  let personArr = ref([])
  let didAddMyself = ref(false)

  onLoad((option) => {
    refreshPerson()
  })

  onShow(() => {
    uni.$on('noGift', function(data) {
      console.log('监听到事件来自 noGift')
      popup.value.open()
    })
  })

  function refreshPerson() {
    getApp().get('tz_person/getTZPerson').then(res => {
      personArr.value = res.data || []
    }).catch(err => {
      console.log(err)
    })
  }

  function onShareAppMessage(res) {

  }

  function baoMing(isJiaYi) {
    let user = getApp().globalData.user
    if (user.nickName && user.avatar) {
      if (isJiaYi) {
        jiayiPopup.value.open()
      } else {
        bmPopup.value.open()
      }
    } else {
      uni.showModal({
        title: '温馨提示',
        content: '为了方便活动组织者识别身份，请先前往设置微信头像与昵称',
        success: function(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/mine/mine',
              fail: function() {
                uni.switchTab({
                  url: '/pages/mine/mine',
                })
              }
            })
          }
        }
      })
    }
  }

  function closeBaoMingPop() {
    bmPopup.value.close()
    refreshPerson()
  }

  function closePop() {
    popup.value.close()
  }

  onHide(() => {
    uni.$off('noGift')
  })
</script>

<style lang="scss">
  .smallTag {
    margin-left: 4px;
  }

  .smallBox {
    border-radius: 3px;
    width: 14px;
    height: 14px;
  }

  .smallWord {
    font-size: 13px;
    color: #999999;
    margin-left: 3px;
  }

  .pname {
    margin-left: 6px;
    color: white;
  }

  .boyClass {
    background-color: #4685F3 !important;
  }

  .cell {
    background-color: #FD5FA9;
    border-radius: 6px;
    margin: 5px;
    padding: 5px;
  }

  .head {
    width: 26px;
    height: 26px;
    border-radius: 13px;
  }
</style>
