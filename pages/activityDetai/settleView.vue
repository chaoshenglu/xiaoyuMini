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
    let girlsCount = 0
    let fCount = 0
    for (var i = 0; i < personArr.value.length; i++) {
      let person = personArr.value[i]
      if (selectedArr.value.indexOf(i) >= 0) {
        selectPersonArr.push(person)
        console.log(person.nickName)
        if (person.isGirl === 1) {
          girlsCount = girlsCount + 1
        }
        if (person.status === 3) {
          fCount = fCount + 1
        }
      }
    }
    console.log(inputFieldsNumber.value)
    console.log(inputBallNumber.value)


    let fcount = parseFloat(inputFieldsNumber.value) // 场地数量
    let ballCount = parseFloat(inputBallNumber.value) // 球的数量
    let bcount = parseFloat(selectPersonArr.length - girlsCount) // 男生数量
    let gcount = parseFloat(girlsCount) // 女生数量
    let flyCount = parseFloat(fCount) // 飞机人数

    let allFlyPrice = parseFloat(flyCount * parseFloat(this.flyPrice)) //所有飞机人应付的费用
    this.price = parseFloat(fcount * this.fieldPrice + ballCount * this.ballPrice) // 总费用=场地费+球费
    let priceWithoutFly = parseFloat(this.price - allFlyPrice) // 不包括飞机费用的总费用
    let newGirlsCount = parseFloat(this.scale * gcount)
    let newPersonCount = parseFloat(newGirlsCount + bcount)

    console.log('男生人数=', bcount)
    console.log('女生人数=', gcount)
    console.log('新女生人数=', newGirlsCount)
    console.log('新总人数(飞机除外)=', newPersonCount)
    console.log('完美的男女总金额', priceWithoutFly)

    let newAverage = (priceWithoutFly / newPersonCount).toFixed(2)
    this.boyPrice = parseFloat(newAverage)
    this.girlPrice = parseFloat((newAverage * this.scale).toFixed(2))
    let boyAndGrilsPrice = (this.boyPrice * bcount + this.girlPrice * gcount).toFixed(2)
    this.newPrice = parseFloat(boyAndGrilsPrice)
    console.log('newPrice=', this.newPrice)

    if (this.newPrice < priceWithoutFly) {
      console.log('群收款不完美，开始调整价格')
      if (gcount >= bcount) {
        console.log('女生原价', this.girlPrice)
        console.log('女生再加一分钱')
        this.girlPrice = (parseFloat(this.girlPrice) + 0.01).toFixed(2)
        console.log('女生最终价', this.girlPrice)
        this.newPrice = (this.boyPrice * bcount + this.girlPrice * gcount).toFixed(2)
        console.log('newnewPrice=', this.newPrice)
      } else {
        console.log('男生原价', this.boyPrice)
        console.log('男生再加一分钱')
        this.boyPrice = (parseFloat(this.boyPrice) + 0.01).toFixed(2)
        console.log('男生最终价', this.boyPrice)
        this.newPrice = (this.boyPrice * bcount + this.girlPrice * gcount).toFixed(2)
        console.log('newnewPrice=', this.newPrice)
      }
    }

    let qunShouKuan = parseFloat(this.newPrice) + allFlyPrice
    console.log(qunShouKuan)

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
