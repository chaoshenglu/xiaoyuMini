<template>
  <view v-if="settle">
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
        <view class="lxColumn" v-for="(person, index) in personArr" :index="index" :key="index">
          <view class="lxCenterRow">
            <text v-if="person.status===3" class="lx999" style="width: 160px;">{{person.nickName}}【飞机】</text>
            <text v-else class="lx999"
              style="width: 160px;">{{person.nickName}}【{{person.isGirl === 1 ? '女':'男'}}】</text>
            <text class="lx999" style="margin-left: 30px;">费用：{{person.money}}元</text>
          </view>
        </view>
      </view>
    </uni-section>

    <HalfBottomBtn title='返回修改' :isLeft="true" @tapBottomBtn="backEdit()" />
    <HalfBottomBtn title='确定保存' :isLeft="false" @tapBottomBtn="confirm()" />

  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'

  import {
    onLoad
  } from "@dcloudio/uni-app"

  const settle = ref(null)
  const personArr = ref([])

  onLoad((option) => {
    settle.value = JSON.parse(option.settle)
    personArr.value = JSON.parse(settle.value.personArrStr)
  })

  function backEdit() {
    uni.navigateBack()
  }

  function confirm() {

  }
</script>

<style lang="scss">

</style>
