<template>
  <view v-if="tiezi">
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
        <view class="smallBox" style="background-color: #999999" />
        <text class="smallWord">排队</text>
      </view>
    </view>
    <view style="margin-left: 4px;margin-right: 4px;margin-top: 8px;">
      <uni-grid :column="4" :highlight="true" @change="change" :showBorder="false" :square="false">
        <uni-grid-item v-for="(person, index) in personArr" :index="index" :key="index">
          <view class="lxCenterR cell" :style="person.style" @click="tapCell(person)" v-if="person.shortName">
            <view class="headBox">
              <image class="head" :src="person.avatar || '/static/defaultAvatar.png'" mode="aspectFill" />
              <image v-if="person.isJiaYi" class="jia" src="/static/jiayi.png" mode="aspectFit" />
              <image v-if="person.isJiaYi != 1 && person.isVip===1" class="vip" src="/static/vipHead.png"
                mode="aspectFit" />
            </view>
            <text v-if="person.shortName.length === 4" class="pname10">{{person.shortName}}</text>
            <text v-else-if="person.shortName.length === 3" class="pname12">{{person.shortName}}</text>
            <text v-else class="pname">{{person.shortName}}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <view class="bottomBox" :style="bottomBoxStyle" @click="tapDetail">
      <view class="lxCenterRow" style="justify-content: space-between;">
        <view class="lxColumn">
          <text class="lx333" style="font-size: 14px;font-weight: bold;">{{tiezi.title || '-'}}</text>
          <text class="lx999" style="font-size: 13px;">{{tiezi.time}} {{tiezi.fields}}</text>
        </view>
        <text style="color: #4685F3;font-size: 14px;margin-right: 10px;">查看详情</text>
      </view>
    </view>

    <view v-if="tiezi.status===1">
      <view v-if="didAddMyself === 1">
        <LXBottomBtn title="报名+1" @tapBottomBtn="baoMing(1)" />
      </view>
      <view v-else>
        <HalfBottomBtn title='报名' :isLeft="true" @tapBottomBtn="baoMing(0)" />
        <HalfBottomBtn title='报名+1' :isLeft="false" @tapBottomBtn="baoMing(1)" />
      </view>
    </view>
    <view v-else>
      <LXBottomBtn :title="tieziStatusStr" backgroundColor="#999999" />
    </view>

  </view>
</template>

<script setup>
  import Gift from '/pages/baoMing/gift.vue'
  import baoMingPop from '/pages/baoMing/baoMingPop.vue'
  import jiayiPop from '/pages/baoMing/jiayiPop.vue'
  import dayjs from 'dayjs'
  import {
    computed,
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
  let didAddMyself = ref(0)
  let tiezi = ref(null)
  let tieziId = ref(null)
  let bottomOffset = ref(0)
  const bottomBoxStyle = computed(() => {
    return {
      bottom: `${bottomOffset.value + 56}px`
    }
  })

  const tieziStatusStr = computed(() => {
    if (tiezi.value.status === 1) {
      return '报名'
    } else if (tiezi.value.status === 2) {
      return '活动已取消'
    } else if (tiezi.value.status === 3) {
      return '已截止报名'
    }
  })

  onLoad((option) => {
    tieziId.value = option.id
    try {
      const safeAreaInsets = uni.getWindowInfo().safeAreaInsets || {}
      bottomOffset.value = safeAreaInsets.bottom || 10
    } catch (e) {
      bottomOffset.value = 34
    }
  })

  onShow(() => {
    getTieZi(tieziId.value)
    uni.$on('noGift', function(data) {
      console.log('监听到事件来自 noGift')
      popup.value.open()
    })
  })

  function getTieZi(id) {
    let uri = 'tiezi/getTieZiById'
    getApp().get(uri, {
      id
    }).then(res => {
      //console.log('data=', JSON.stringify(res.data, null, 2))
      tiezi.value = res.data
      getPersonArr(tieziId.value)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function getPersonArr(id, updateTiezi) {
    let param = {}
    param.tieziId = id
    param.status = [1]
    param.page = 1
    param.size = 100
    getApp().post('tz_person/getTZPerson', param).then(res => {
      let arr = res.data.list || []
      didAddMyself.value = 0 //恢复默认值
      for (var i = 0; i < arr.length; i++) {
        let person = arr[i]
        if (person.nickName.length > 4) {
          person.shortName = person.nickName.slice(0, 4)
        } else {
          person.shortName = person.nickName
        }
        if (person.isGirl) {
          person.style = {
            backgroundColor: '#FD5FA9'
          }
        } else {
          person.style = {
            backgroundColor: '#4685F3'
          }
        }
        if (i >= tiezi.value.limitNumber) {
          person.style = {
            backgroundColor: '#999999'
          }
          person.waiting = true
        } else {
          person.waiting = false
        }
        if (person.openid === getApp().globalData.openid && person.isJiaYi != 1) {
          didAddMyself.value = 1
        }
      }
      personArr.value = arr

      if (updateTiezi === 1) {
        updateTieziPersonNumber(arr.length)
      }

    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function updateTieziPersonNumber(length) {
    let param = {
      id: tiezi.value.id,
      personNumber: length
    }
    getApp().post('tiezi/updateTiezi', param).then(res => {
      console.log('updateTiezi res=', res)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function onShareAppMessage(res) {

  }

  function baoMing(isJiaYi) {
    if (personArr.value.length >= tiezi.value.limitNumber) {
      uni.showModal({
        title: '报名人数超限',
        content: `当前人数已达${personArr.value.length}人，是否进入排队区？`,
        success: res => {
          if (res.confirm) {
            baoMing_continue(isJiaYi)
          }
        }
      })
      return
    }
    if (personArr.value.length >= 100) {
      uni.showModal({
        title: '报名人数过多',
        content: '当前人数已达100人，超过了系统极限',
      })
      return
    }
    baoMing_continue(isJiaYi)
  }

  function baoMing_continue(isJiaYi) {
    let user = getApp().globalData.user
    if (user.nickName) {
      if (isJiaYi) {
        jiayiPopup.value.open()
      } else {
        bmPopup.value.open()
      }
    } else {
      uni.showModal({
        title: '温馨提示',
        content: '为了方便活动组织者识别身份，请先前往完善个人信息',
        success: res => {
          if (res.confirm) {
            uni.navigateTo({
              url: '/pages/myInfo/myInfo'
            })
          }
        }
      })
    }
  }

  function tapCell(person) {
    console.log(JSON.stringify(person, null, 2))
    let user = getApp().globalData.user
    let clubIdsStr = user.clubIdsStr || ''
    let clubIds = clubIdsStr.split(',')
    if (person.openid == getApp().globalData.openid) {
      console.log('报名者取消报名') //lxtodo发起者不能取消报名
      alert2cancel2owner(person)
    } else if (clubIds.indexOf(`${tiezi.value.clubId}`) >= 0) {
      console.log('管理员取消报名')
      alert2cancel2remove(person)
    } else {
      console.log('查看此人信息')
    }
  }

  function alert2cancel2remove(person) {
    uni.showModal({
      title: '确定将此人移除吗？',
      cancelText: '再考虑下',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          updatePersonStatus(person, 2)
          addCancelRecord(person, 5)
        }
      }
    })
  }

  function alert2cancelWait(person) {
    let content = null
    if (person.targetNum) {
      content = `若现在不取消排队，系统将在报名人数未达到${person.targetNum}人时，为你选择合适的时间自动取消`
    }
    uni.showModal({
      title: '确定取消排队吗？',
      content: content,
      cancelText: '先等等',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          updatePersonStatus(person, 2)
          addCancelRecord(person)
        }
      }
    })
  }

  function alert2cancel2owner(person) {
    if (tiezi.value.status === 2) {
      console.log('活动已经取消')
      return
    }
    if (person.waiting) {
      alert2cancelWait(person)
      return
    }
    let content = '每次取消报名，将扣除10积分'
    let timestamp = new Date().getTime()
    let status = 2
    let stopBaoMingTime = tiezi.value.stopBaoMingTime
    if (timestamp > dayjs(stopBaoMingTime, "YYYY-MM-DD HH:mm:ss").valueOf()) {
      content = '取消后若无人接替，将扣除10积分，且须支付10元飞机费'
      status = 3
      if (person.isVip === 1) {
        content = '取消后若无人接替，将扣除10积分'
      }
    }
    if (person.targetNum) {
      content = `现在取消报名，将扣除10积分，若现在不取消报名，系统将在报名人数未达到${person.targetNum}人时，为你选择合适的时间自动取消报名`
    }
    uni.showModal({
      title: '确定取消报名吗？',
      content: content,
      cancelText: '先等等',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          updatePersonStatus(person, status)
          addCancelRecord(person)
        }
      }
    })
  }

  function addCancelRecord(person, actionType) {
    let user = getApp().globalData.user
    let param = {
      openid: user.openid,
      nickName: user.nickName,
      tieziId: tiezi.value.id,
      actionType: 3 //默认是给自己取消报名
    }
    if (person.isJiaYi === 1) {
      param.actionType = 4 //1报名 2为加一报名 3.为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
      param.onNickName = person.nickName
    }
    if (actionType === 5) {
      param.actionType = actionType
      param.onNickName = person.nickName
    }
    getApp().post('tz_record/addTZRecord', param).then(res => {
      console.log('addTZRecord res=', JSON.stringify(res, null, 2))
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function tapDetail() {
    uni.navigateTo({
      url: `/pages/activityDetai/activityDetai?tieziId=${tiezi.value.id}`
    })
  }

  function updatePersonStatus(person, status) {
    let uri = 'tz_person/updateTZPerson'
    let param = {
      id: person.id,
      status: status //1已报名2已取消3已飞机
    }
    getApp().post(uri, param).then(res => {
      console.log('res=', JSON.stringify(res, null, 2))
      getPersonArr(tiezi.value.id, 1)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function closeJiaYiPop() {
    jiayiPopup.value.close()
    getPersonArr(tiezi.value.id, 1)
  }

  function closeBaoMingPop() {
    bmPopup.value.close()
    getPersonArr(tiezi.value.id, 1)
  }

  function closePop() {
    popup.value.close()
  }

  onHide(() => {
    uni.$off('noGift')
  })
</script>

<style lang="scss">
  page {
    background-color: #F6F6F6;
  }

  .bottomBox {
    background-color: white;
    width: 88vw;
    border-radius: 6px;
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.02);
    left: 3vw;
    position: fixed;
  }

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
