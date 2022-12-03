<template>
  <view class="lxColumn" style="background-color:white;width:100vw;min-height: 100vh;">
    <view v-if="tz.isSettled === 1">
      已结算
    </view>
    <view v-else style="padding-top: 36px;">
      <view v-if="canSettle" class="lxColumn lxCheckBox">
        <uni-section title="场地数量" type="line" padding="0">
          <view style="margin-left: 20px;">
            <uni-number-box v-model="inputFieldsNumber" />
          </view>
        </uni-section>
        <uni-section title="用球数量" type="line" padding="0">
          <view style="margin-left: 20px;">
            <uni-number-box v-model="inputBallNumber" />
          </view>
        </uni-section>
        <uni-section title="活动人员" type="line" padding="0">
          <view style="margin-left: 20px;">
            <uni-data-checkbox multiple v-model="selectedArr" :localdata="personArr" selectedColor="#4685F3"
              selectedTextColor="#333">
            </uni-data-checkbox>
          </view>
        </uni-section>
      </view>
      <view v-else class="emptySettle lxCenterC">
        未结算
      </view>
    </view>
    <LXBottomBtn v-if="tz.isSettled != 1 && canSettle" title="去结算" @tapBottomBtn="tapBottomBtn" />
  </view>
</template>

<script setup>
  import {
    computed,
    onMounted,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  const selectedArr = ref([])
  const inputFieldsNumber = ref(0)
  const inputBallNumber = ref(0)
  const canSettle = computed(() => {
    return true
  })
  const personArr = ref([])

  onMounted(() => {
    getPersonArr()
    let fieldsStr = tz.value.fields.slice(0, tz.value.fields.length - 2)
    let fieldsArr = fieldsStr.split(',')
    inputFieldsNumber.value = fieldsArr.length
    inputBallNumber.value = fieldsArr.length * 12
  })

  function getPersonArr() {
    let param = {}
    param.tieziId = tz.value.id
    param.status = [1]
    param.page = 1
    param.size = 100
    getApp().post('tz_person/getTZPerson', param).then(res => {
      let arr = res.data.list || []
      let indexArr = []
      for (var i = 0; i < arr.length; i++) {
        let person = arr[i]
        person.text = person.nickName
        person.value = i
        indexArr.push(i)
      }
      personArr.value = arr
      selectedArr.value = indexArr
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function tapBottomBtn() {
    let selectPersonArr = []
    for (var i = 0; i < personArr.value.length; i++) {
      let person = personArr.value[i]
      if (selectedArr.value.indexOf(i) >= 0) {
        selectPersonArr.push(person)
        console.log(person.nickName)
      }
    }
    console.log(inputFieldsNumber.value)
    console.log(inputBallNumber.value)
  }
</script>

<style lang="scss">
  .emptySettle {
    color: #999999;
    font-size: 16px;
    width: 100vw;
    height: 100vw;
  }

  .lxCheckBox {
    transform: scale(1.2);
    width: 85vw;
    margin-left: 9vw;
  }
</style>
