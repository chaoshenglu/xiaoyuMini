<template>
  <view class="baoMingPop">
    <view style="padding: 16px;">
      <text class="lx333" style="font-size: 18px;font-weight: 500;">报名信息</text>
      <view class="lxCenterRow" style="justify-content: space-between;margin-top: 14px;">
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

      <view v-if="qiuguanArr" class="lxCenterRow" style="justify-content: space-between;margin-top: 14px;">
        <view class="lxCenterRow">
          <text class="lx333" style="font-size: 16px;margin-right: 4px;">球馆</text>
          <radio-group @change="qiuGuanChange" class="lxCenterRow">
            <view v-for="(qiuguan, index) in qiuguanArr" :key="qiuguan.qiuguanId" class="lxCenterRow">
              <radio color="#4685F3" style="margin-left: 6px;" :value="qiuguan.qiuguanId"
                :checked="qiuguan.qiuguanId === selectedQiuguanId" />
              <view class="lx666">{{qiuguan.qiuguanTinyName}}</view>
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
    ref,
    computed,
    onMounted
  } from 'vue'
  let current = ref(getApp().globalData.user.isGirl === 1 ? 1 : 0)
  let selectedQiuguanId = ref(null)
  const emit = defineEmits(['closeBaoMingPop'])
  const props = defineProps(['tiezi'])
  let user = ref(getApp().globalData.user)
  let existingMyself = ref(null)
  const qiuguanArr = computed(() => {
    if (props.tiezi.qiuguanArr) {
      return JSON.parse(props.tiezi.qiuguanArr)
    } else {
      return []
    }
  })

  const items = [{
      value: 0,
      name: '男'
    },
    {
      value: 1,
      name: '女'
    }
  ]

  onMounted(() => {
    let param = {}
    param.tieziId = props.tiezi.id
    param.page = 1
    param.size = 100
    param.status = [2, 3]
    param.openid = getApp().globalData.openid
    getApp().post('tz_person/getTZPerson', param).then(res => {
      let arr = res.data.list || []
      for (const person of arr) {
        if (person.isJiaYi != 1) {
          existingMyself.value = person
          break
        }
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  })

  function tapConfirm() {
    let user = getApp().globalData.user
    user.isGirl = parseInt(current.value)
    user.isJiaYi = 0
    user.status = 1 //1已报名2已取消3已飞机
    addTZRecord(user, props.tiezi.id)
    updateUserGender(user)
  }

  function addTZRecord(user, tieziId) {
    let param = {
      openid: user.openid,
      name: user.name,
      nickName: user.nickName,
      tieziId: tieziId,
      actionType: 1, //1报名 2为加一报名 3.为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
    }
    getApp().post('tz_record/addTZRecord', param).then(res => {
      if (res.code === 1) {
        baoMing_addTZPerson(user, tieziId)
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
    getApp().post('user/updateUserInfo', param).then(res => {
      if (res.code === 1) {
        uni.setStorageSync('user', user)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function baoMing_addTZPerson(user, tieziId) {
    let param = user
    param.tieziId = tieziId
    getApp().post('tz_person/addTZPerson', param).then(res => {
      if (res.code === 1) {
        emit('closeBaoMingPop')
        handleRes(res)
        tryDeleteOldMyself(tieziId)
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      emit('closeBaoMingPop')
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function tryDeleteOldMyself(tieziId) {
    if (existingMyself.value && existingMyself.value.id) {
      let param = {
        personId: existingMyself.value.id,
        tieziId: tieziId
      }
      getApp().post('tz_person/delTZPerson', param).then(res => {
        console.log('删除我上次报名产生的person', res)
      }).catch(err => {
        getApp().toastAndConsoleSystemError(err)
      })
    }
  }

  function handleRes(res) {
    if (res.code === 1) {
      uni.showModal({
        title: '报名成功',
        showCancel: false,
        content: '点击自己的头像，可取消报名，点右上角“三个点”分享此页面到群里，将有机会获得1积分奖励',
        confirmText: '我知道了'
      })
    } else {
      getApp().toastAndConsoleSystemError(res)
    }
  }

  function qiuGuanChange(e) {
    selectedQiuguanId.value = e.detail.value
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
