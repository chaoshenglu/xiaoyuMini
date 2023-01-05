<template>
  <view class="lxColumn" style="background-color:white;width:100vw;min-height: 100vh;">
    <view v-if="tz.isSettled === 1">
      <view v-if="settle" style="margin-top:15px;">
        <uni-section title="执行参数" type="line" padding="0">
          <view class="lxColumn" style="margin-left: 20px;">
            <view class="lxCenterRow">
              <view class="lxColumn" style="width: 160px;">
                <text class="lx999">场地时长：{{parseInt(settle.fieldHours)}}小时</text>
                <text class="lx999">场地单价：{{parseInt(settle.fieldPrice)}}元/小时</text>
                <text class="lx999">场地数量：{{parseInt(settle.fieldNum)}}</text>
                <text class="lx999">用球数量：{{parseInt(settle.ballNum)}}个</text>
                <text class="lx999">用球单价：{{settle.ballPrice}}元/个</text>
                <text class="lx999">手动改价：{{settle.gaiJia}}元</text>
              </view>
              <view class="lxColumn" style="margin-left: 30px;">
                <text class="lx999">男生人数：{{parseInt(settle.boyNum)}}</text>
                <text class="lx999">女生人数：{{parseInt(settle.girlNum)}}</text>
                <text class="lx999">VIP男生人数：{{parseInt(settle.boyVipNum)}}</text>
                <text class="lx999">VIP女生人数：{{parseInt(settle.girlVipNum)}}</text>
                <text class="lx999">飞机人数：{{parseInt(settle.flyNum)}}</text>
                <text class="lx999">正义指数：{{settle.justice}}</text>
              </view>
            </view>
          </view>
        </uni-section>

        <uni-section title="计算结果" type="line" padding="0">
          <view class="lxColumn" style="margin-left: 20px;">
            <view class="lxCenterRow">
              <view class="lxColumn" style="width: 160px;">
                <text class="lx999">男生：{{settle.boyPrice}}元/人</text>
                <text class="lx999">女生：{{settle.girlPrice}}元/人</text>
                <text class="lx999">飞机：{{settle.flyPrice}}元/人</text>
              </view>
              <view class="lxColumn" style="margin-left: 30px;">
                <text class="lx999">VIP男生：{{settle.boyVipPrice}}元/人</text>
                <text class="lx999">VIP女生：{{settle.girlVipPrice}}元/人</text>
                <text class="lx999">总费用：{{settle.allPrice}}元</text>
              </view>
            </view>
          </view>
        </uni-section>

        <uni-section title="费用分摊" type="line" padding="0">
          <view class="lxColumn" style="margin-left: 20px;">
            <view class="lxColumn" v-for="(person, index) in netPersonArr" :index="index" :key="index">
              <view class="lxCenterRow" style="justify-content: space-between;">
                <view class="lxCenterRow">
                  <image v-if="person.isVip===1" src="/static/vipPre.png" mode="aspectFit"
                    style="width: 25px;height: 14px;margin-right: 5px;">
                  </image>
                  <text v-if="person.status===3" class="lx999" style="width: 160px;">{{person.nickName}}【飞机】</text>
                  <text v-else class="lx999"
                    style="width: 160px;">{{person.nickName}}【{{person.isGirl === 1 ? '女':'男'}}】</text>
                </view>
                <text class="lx999" style="margin-right: 30px;">费用：{{(parseFloat(person.money)).toFixed(2)}}元</text>
              </view>
            </view>
          </view>
        </uni-section>
      </view>
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
    return tz.value.isSettled != 1 && tz.value.createdPersonId === getApp().globalData.openid
  })
  const personArr = ref([])
  const netPersonArr = ref([])
  const settle = ref(null)

  onMounted(() => {
    getPersonArr()
    let fields = tz.value.fields || ''
    let fieldsStr = fields.replace('号场', '')
    let fieldsArr = fieldsStr.split(',')
    inputFieldsNumber.value = fieldsArr.length
    inputBallNumber.value = fieldsArr.length * 12
    if (tz.value.isSettled) {
      getSettleDetail()
    }
  })

  function getSettleDetail() {
    let uri = 'settle/getSettleDetail'
    getApp().get(uri, {
      tieziId: tz.value.id
    }).then(res => {
      settle.value = res.data
      netPersonArr.value = JSON.parse(settle.value.personArrStr)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

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

    let boyVipPrice = (boyPrice * 0.9).toFixed(2)
    let girlVipPrice = (girlPrice * 0.9).toFixed(2)

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
          newPerson.money = newPerson.isVip === 1 ? girlVipPrice : girlPrice
        } else {
          newPerson.money = newPerson.isVip === 1 ? boyVipPrice : boyPrice
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
      "boyVipPrice": boyVipPrice,
      "girlVipPrice": girlVipPrice,
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
