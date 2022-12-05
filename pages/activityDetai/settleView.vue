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
  const oneFieldPrice = ref(80)
  const oneBallPrice = ref(8)
  const justiceScale = ref(0.7)
  const oneFlyPrice = ref(10)
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
    param.status = [1, 3]
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
    let girlsCount = 0
    let boysCount = 0
    let fCount = 0
    for (var i = 0; i < personArr.value.length; i++) {
      let person = personArr.value[i]
      if (selectedArr.value.indexOf(i) >= 0) {
        selectPersonArr.push(person)
        if (person.status === 3) {
          fCount = fCount + 1
        } else {
          if (person.isGirl === 1) {
            girlsCount = girlsCount + 1
          } else {
            boysCount = boysCount + 1
          }
        }
      }
    }

    let fcount = parseFloat(inputFieldsNumber.value) // 场地数量
    let ballCount = parseFloat(inputBallNumber.value) // 球的数量
    let bcount = parseFloat(boysCount) // 男生数量
    let gcount = parseFloat(girlsCount) // 女生数量
    let flyCount = parseFloat(fCount) // 飞机人数
    let fieldPrice = parseFloat(oneFieldPrice.value)
    let ballPrice = parseFloat(oneBallPrice.value)
    let scale = parseFloat(justiceScale.value)

    let allFlyPrice = parseFloat(flyCount * parseFloat(oneFlyPrice.value)) //所有飞机人应付的费用
    let price = parseFloat(fcount * fieldPrice + ballCount * ballPrice).toFixed(2) // 总费用=场地费+球费
    let priceWithoutFly = parseFloat(price - allFlyPrice) // 不包括飞机费用的总费用
    let newGirlsCount = parseFloat(scale * gcount)
    let newPersonCount = parseFloat(newGirlsCount + bcount)

    console.log('男生人数=', bcount)
    console.log('女生人数=', gcount)
    console.log('飞机人数=', flyCount)
    console.log('新女生人数=', newGirlsCount)
    console.log('新总人数(飞机除外)=', newPersonCount)
    console.log('完美的男女总金额', priceWithoutFly)

    let newAverage = (priceWithoutFly / newPersonCount).toFixed(2)
    let boyPrice = parseFloat(newAverage)
    let girlPrice = parseFloat((newAverage * scale).toFixed(2))
    let boyAndGrilsPrice = (boyPrice * bcount + girlPrice * gcount).toFixed(2)
    let newPrice = parseFloat(boyAndGrilsPrice)
    console.log('newPrice=', newPrice)

    if (newPrice < priceWithoutFly) {
      console.log('群收款不完美，开始调整价格')
      if (gcount >= bcount) {
        console.log('女生原价', girlPrice)
        console.log('女生再加一分钱')
        girlPrice = (parseFloat(girlPrice) + 0.01).toFixed(2)
        console.log('女生最终价', girlPrice)
        newPrice = (boyPrice * bcount + girlPrice * gcount).toFixed(2)
        console.log('newnewPrice=', newPrice)
      } else {
        console.log('男生原价', boyPrice)
        console.log('男生再加一分钱')
        boyPrice = (parseFloat(boyPrice) + 0.01).toFixed(2)
        console.log('男生最终价', boyPrice)
        newPrice = (boyPrice * bcount + girlPrice * gcount).toFixed(2)
        console.log('newnewPrice=', newPrice)
      }
    }

    let qunShouKuan = parseFloat(newPrice) + allFlyPrice
    console.log(qunShouKuan)

    let newPersonArr = []
    for (var i = 0; i < personArr.value.length; i++) {
      let person = personArr.value[i]
      let newPerson = {
        nickName: person.nickName,
        isGirl: person.isGirl,
        isVip: person.isVip,
        status: person.status
      }
      if (person.status === 3) {
        newPerson.money = oneFlyPrice.value
      } else {
        if (person.isGirl === 1) {
          newPerson.money = girlPrice
        } else {
          newPerson.money = boyPrice
        }
      }
      newPersonArr.push(newPerson)
    }
    let arrStr = JSON.stringify(newPersonArr)
    let settleModel = {
      "boyPrice": boyPrice,
      "girlPrice": girlPrice,
      "allPrice": price,
      "flyPrice": oneFlyPrice.value,
      "boyVipPrice": (boyPrice * 0.9).toFixed(2),
      "girlVipPrice": (girlPrice * 0.9).toFixed(2),
      "fieldPrice": fieldPrice,
      "fieldHours": 2, //lxtodo
      "boyNum": bcount,
      "girlNum": gcount,
      "fieldNum": fcount,
      "ballNum": ballCount,
      "flyNum": flyCount,
      "justice": scale,
      "boyVipNum": 0,
      "girlVipNum": 0,
      "ballPrice": ballPrice,
      "gaiJia": 0,
      "gaiJiaReason": '', //lxtodo
      "personArrStr": arrStr,
      "tieziId": tz.value.id
    }
    uni.navigateTo({
      url: '/pages/previewSettle/previewSettle?settle=' + JSON.stringify(settleModel)
    })
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
