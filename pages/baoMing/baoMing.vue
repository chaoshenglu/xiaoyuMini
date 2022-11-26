<template>
  <view>
    <uni-popup ref="popup" type="center">
      <Gift @closePop="closePop" />
    </uni-popup>

    <uni-popup ref="bmPopup" type="center">
      <baoMingPop :tiezi="tiezi" @closeBaoMingPop="closeBaoMingPop" />
      <view style="height: 20vh;" />
    </uni-popup>

    <uni-popup ref="jiayiPopup" type="center">
      <jiayiPop :tiezi="tiezi" @closeJiaYiPop="closeJiaYiPop" />
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
        <view class="smallBox" style="background-color: #E2E2E2;" />
        <text class="smallWord">空位</text>
      </view>
      <view class="smallTag lxCenterRow">
        <view class="smallBox" style="background-color: #999999" />
        <text class="smallWord">排队</text>
      </view>
    </view>
    <view style="margin-left: 4px;margin-right: 4px;margin-top: 8px;">
      <uni-grid :column="4" :highlight="true" @change="change" :showBorder="false" :square="false">
        <uni-grid-item v-for="(person, index) in personArr" :index="index" :key="index">
          <view class="lxCenterR cell" @click="tapCell(person)" :class="{ 'boyClass': person.isGirl === 0}"
            v-if="person.nickName">
            <view class="headBox">
              <image class="head" :src="person.avatar" mode="aspectFit" />
              <image v-if="person.isJiaYi" class="jia" src="/static/jiayi.png" mode="aspectFit" />
              <image v-else class="vip" src="/static/vipHead.png" mode="aspectFit" />
            </view>
            <text v-if="person.nickName.length === 4" class="pname10">{{person.nickName}}</text>
            <text v-else-if="person.nickName.length === 3" class="pname12">{{person.nickName}}</text>
            <text v-else class="pname">{{person.nickName}}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view style="width: 100vw;margin-top: 100px" class="lxCenterC">
      <image src="/static/more.png" mode="aspectFit" style="width: 100px;"></image>
    </view>

    <HalfBottomBtn title='报名' :isLeft="true" @tapBottomBtn="baoMing(0)" />
    <HalfBottomBtn title='报名+1' :isLeft="false" @tapBottomBtn="baoMing(1)" />
  </view>
</template>

<script setup>
  import Gift from '/pages/baoMing/gift.vue'
  import baoMingPop from '/pages/baoMing/baoMingPop.vue'
  import jiayiPop from '/pages/baoMing/jiayiPop.vue'
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
  let tiezi = ref(null)

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

  function tapCell(person) {
    console.log(JSON.stringify(person, null, 2))
    if (person.openid == getApp().globalData.openid) {
      alert2cancel2owner(person)
    }
  }

  function alert2cancel2owner(person) {
    uni.showModal({
      title: '确定取消报名吗？',
      content: '每次取消报名，将扣除10积分',
      cancelText: '再考虑下',
      confirmText: '确定',
      success: res => {
        updatePersonStatus(person)
        addCancelRecord(person)
      }
    })
  }

  function addCancelRecord(person) {
    let user = getApp().globalData.user
    let param = {
      openid: user.openid,
      nickName: user.nickName,
      actionType: 3 //默认是给自己取消报名
    }
    if (person.isJiaYi === 1) {
      param.actionType = 4 //1报名 2为加一报名 3.为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
      param.onNickName = person.nickName
    }
    getApp().post('tz_record/addTZRecord', param).then(res => {
      console.log('addTZRecord res=', JSON.stringify(res, null, 2))
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function updatePersonStatus(person) {
    let uri = 'tz_person/updateTZPerson'
    let param = {
      id: person.id,
      status: 2
    }
    getApp().post(uri, param).then(res => {
      console.log('res=', JSON.stringify(res, null, 2))
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function closeJiaYiPop() {
    jiayiPopup.value.close()
    refreshPerson()
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

  .pname10 {
    margin-left: 3px;
    color: white;
    font-size: 10px;
  }

  .pname12 {
    margin-left: 6px;
    color: white;
    font-size: 12px;
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

  .headBox {
    width: 24px;
    height: 24px;
    position: relative;
  }

  .vip {
    position: absolute;
    top: -3px;
    right: -1px;
    width: 24px;
    height: 24px;
  }

  .jia {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
  }

  .head {
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
</style>
