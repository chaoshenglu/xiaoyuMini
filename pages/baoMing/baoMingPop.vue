<template>
  <view class="baoMingPop">
    <view style="padding: 16px;">
      <text class="lx333" style="font-size: 18px;font-weight: 500;">报名信息</text>

      <view class="lxColumn" style="margin-top: 14px;">
        <text class="lx333" style="margin-bottom: 5px;">时间：{{jiYueJiRi}} {{tiezi.time}}</text>
        <text class="lx333" v-if="qiuguanArr.length === 0">地点：{{tiezi.qiuguanName}}</text>
      </view>

      <view v-if="qiuguanArr.length" class="lxCenterRow" style="justify-content: space-between;margin-top: 14px;">
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
        <switch @change="switch2Change" :checked="isCheckNum" type="checkbox" color="#4685F3"
          style="transform:scale(0.7)" />
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
    computed,
    // onMounted
  } from 'vue'
  import dayjs from 'dayjs'

  let selectedQiuguanId = ref(null)
  const emit = defineEmits(['closeBaoMingPop'])
  const props = defineProps(['tiezi'])
  let user = ref(getApp().globalData.user)
  const inputNumber = ref(8)
  const isCheckNum = ref(false)
  const qiuguanArr = computed(() => {
    if (props.tiezi.qiuguanArr) {
      return JSON.parse(props.tiezi.qiuguanArr)
    } else {
      return []
    }
  })

  const jiYueJiRi = computed(() => {
    let dateStr = props.tiezi.date
    let date = dayjs(dateStr)
    return date.format('M月D日')
  })

  // onMounted(() => {

  // })

  function switch2Change(e) {
    isCheckNum.value = e.detail.value
  }

  function tapConfirm() {
    if (!selectedQiuguanId.value && props.tiezi.qiuguanArr) {
      getApp().toast('请选择球馆')
      return
    }
    let person = JSON.parse(JSON.stringify(getApp().globalData.user))
    person.isJiaYi = 0
    person.status = 1 //1已报名2已取消3已飞机
    person.tieziId = props.tiezi.id
    if (selectedQiuguanId.value) {
      person.qiuguanId = selectedQiuguanId.value
    }
    if (isCheckNum.value === true) {
      person.targetNum = inputNumber.value
    }
    baoMing_addTZPerson(person)
  }

  function baoMing_addTZPerson(person) {
    getApp().post('tz_person/addTZPerson', person).then(res => {
      if (res.code === 1) {
        emit('closeBaoMingPop')
        handleRes(res)
        tryDeleteOldMyself()
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      emit('closeBaoMingPop')
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function tryDeleteOldMyself() {
    let param = {}
    param.tieziId = props.tiezi.id
    param.page = 1
    param.size = 100
    param.status = [2, 3]
    param.openid = getApp().globalData.openid
    getApp().post('tz_person/getTZPerson', param).then(res => {
      let arr = res.data.list || []
      let existingMyself = null
      for (const person of arr) {
        if (person.isJiaYi != 1) {
          existingMyself = person
          console.log('⭕️existingMyself =', person)
          break
        }
      }

      if (existingMyself && existingMyself.id) {
        getApp().post('tz_person/delTZPerson', {
          personId: existingMyself.id,
          tieziId: props.tiezi.id
        }).then(res => {
          console.log('⭕删除我上次报名产生的person', res)
        }).catch(err => {
          getApp().toastAndConsoleSystemError(err)
        })
      }

    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
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
