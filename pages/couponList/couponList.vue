<template>
  <view>
    <z-paging ref="paging" v-model="couponArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(coupon,index) in couponArr" :key="coupon.id" @click="tapCell(coupon)">
          <view class="lxCenterRow">
            <view class="lxCenterColumn">
              <view class="lxCenterRow">
                <text style="font-size: 14px;color:#ff4500">￥</text>
                <text style="font-size:26px;color:#ff4500">{{coupon.money}}</text>
              </view>
              <text class="remark">{{coupon.desc}}</text>
            </view>
            <view class="lxColumn" style="margin-left: 22px;">
              <text class="title">{{coupon.title}}</text>
              <view style="height: 5px;"></view>
              <text class="remark">{{coupon.remark}}</text>
            </view>
          </view>
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
  let couponArr = []

  const queryList = (pageNo, pageSize) => {
    if (getApp().globalData.user.gift) {
      paging.value.complete([{
        title: '新人红包',
        money: getApp().globalData.user.gift,
        desc: '无使用门槛',
        remark: '订单结算时自动抵扣',
        id: 0
      }])
    } else {
      paging.value.complete([])
    }
  }
</script>

<style lang="scss">
  .moneyTitle {}

  .remark {
    font-size: 14px;
    color: #999999;
  }

  .title {
    font-size: 18px;
    color: #666666;
  }
</style>
