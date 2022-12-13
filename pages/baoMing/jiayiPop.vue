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

      <view class="lxCenterRow" style="margin-top: 14px;">
        <switch @change="switch2Change" type="checkbox" color="#4685F3" style="transform:scale(0.7)" />
        <text class="lx666" style="font-size: 14px;">若报名总人数不足</text>
        <uni-number-box v-model="inputNumber" :min="6" :max="12" style="transform:scale(0.85)" />
        <text class="lx666" style="font-size: 14px;">人</text>
      </view>
      <text class="lx666" style="font-size: 14px;margin-left: 29px;">自动帮TA在合适的时机取消报名</text>

    </view>
    <button type="default" @click="tapConfirm" class="confirmBtn">确定</button>
    <view style="height: 12px;" />
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue'
  let current = ref(0)
  let nickName = ref('')
  const inputNumber = ref(8)
  const emit = defineEmits(['closeJiaYiPop'])
  const props = defineProps(['tiezi'])
  let user = ref(getApp().globalData.user)
  let selectedQiuguanId = ref(null)

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

  function onInput(e) {
    nickName.value = e.detail.value
  }

  function tapConfirm() {
    if (!selectedQiuguanId.value && props.tiezi.qiuguanArr) {
      getApp().toast('请选择球馆')
      return
    }
    if (nickName.value === '' || !nickName.value) {
      return
    }
    let user = {
      nickName: nickName.value,
      avatar: getApp().globalData.user.avatar,
      isGirl: current.value,
      isJiaYi: 1,
      openid: getApp().globalData.openid,
      status: 1, //1已报名2已取消3已飞机
      tieziId: props.tiezi.id,
      qiuguanId: selectedQiuguanId.value
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
      qiuguanId: selectedQiuguanId.value
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

  function qiuGuanChange(e) {
    selectedQiuguanId.value = e.detail.value
  }

  function radioChange(e) {
    current.value = e.detail.value
  }
</script>

<style lang="scss">
  .baoMingPop {
    width: 80vw;
    background-color: white;
    border-radius: 6px;
  }

  .confirmBtn {
    background-color: #4685F3 !important;
    color: white !important;
    transform: scale(0.88);
    width: 80vw;
  }
</style>
