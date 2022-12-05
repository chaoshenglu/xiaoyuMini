<template>
  <view>
    <uni-section title="执行参数" type="line" padding="0">
      <view class="lxColumn" style="margin-left: 20px;">
        <view class="lxCenterRow">
          <view class="lxColumn" style="width: 160px;">
            <text class="lx999">场地时长：2小时</text>
            <text class="lx999">场地单价：40元/小时</text>
            <text class="lx999">场地数量：1</text>
            <text class="lx999">用球数量：6个</text>
            <text class="lx999">用球单价：8元/个</text>
          </view>
          <view class="lxColumn" style="margin-left: 30px;">
            <text class="lx999">男生人数：5</text>
            <text class="lx999">女生人数：2</text>
            <text class="lx999">VIP人数：0</text>
            <text class="lx999">飞机人数：3</text>
            <text class="lx999">正义指数：0.7</text>
          </view>
        </view>
      </view>
    </uni-section>

    <uni-section title="计算结果" type="line" padding="0">
      <view class="lxColumn" style="margin-left: 20px;">
        <view class="lxCenterRow">
          <view class="lxColumn" style="width: 160px;">
            <text class="lx999">男生：15元/人</text>
            <text class="lx999">女生：11元/人</text>
            <text class="lx999">飞机：10元/人</text>
          </view>
          <view class="lxColumn" style="margin-left: 30px;">
            <text class="lx999">男生VIP：13元/人</text>
            <text class="lx999">女生VIP：9元/人</text>
            <text class="lx999">总费用：139元</text>
          </view>
        </view>
      </view>
    </uni-section>

    <uni-section title="费用分摊" type="line" padding="0">
      <view class="lxColumn" style="margin-left: 20px;">
        <view class="lxColumn" v-for="(person, index) in personArr" :index="index" :key="index">
          <view class="lxCenterRow">
            <text class="lx999" style="width: 160px;">{{person.nickName}}【{{person.isGirl === 1 ? '女':'男'}}】【vip】</text>
            <text class="lx999" style="margin-left: 30px;">费用：9元</text>
          </view>
        </view>
      </view>
    </uni-section>

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

  const personArr = [{
    nickName: '正道的光',
    isGirl: 0,
    isVip: 0,
    money: 10
  }, {
    nickName: '正道的光',
    isGirl: 0,
    isVip: 0,
    money: 10
  }]

  onLoad((option) => {

  })
</script>

<style lang="scss">

</style>
