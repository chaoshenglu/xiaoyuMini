<template>
  <view>
    <z-paging ref="paging" v-model="couponArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(coupon,index) in couponArr" :key="coupon.id" @click="tapCell(coupon)">
          <text class="title">{{coupon.title}}</text>
          <text class="title">{{coupon.money}}</text>
          <text class="remark">{{coupon.desc}}</text>
          <text class="remark">{{coupon.remark}}</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  const paging = ref(null)
  const couponArr = [{
    title: '新人红包',
    money: getApp().globalData.user.gift.money,
    desc: '无使用门槛',
    remark: '订单结算时自动抵扣',
    id: 0
  }]

  const queryList = (pageNo, pageSize) => {
    paging.value.complete(couponArr)
  }
</script>

<style lang="scss">
  .remark {
    font-size: 14px;
    color: #666666;
  }

  .title {
    font-size: 16px;
    color: #222222;
  }
</style>
