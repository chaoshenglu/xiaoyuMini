<template>
  <view class="lxColumn">
    <view v-if="tz.isSettled === 1">
      已结算
    </view>
    <view v-else style="padding-top: 30px;">
      <view v-if="canSettle" class="lxCheckBox lxColumn">
        <uni-data-checkbox multiple v-model="selectedArr" :localdata="personArr" selectedColor="#4685F3"
          selectedTextColor="#333">
        </uni-data-checkbox>
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

  const canSettle = computed(() => {
    return true
  })

  const personArr = ref([])

  onMounted(() => {
    getPersonArr()
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
    width: 80vw;
    margin-left: 7vw;
  }
</style>
