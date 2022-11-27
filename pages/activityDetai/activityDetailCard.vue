<template>
  <view class="infoListCell">
    <view class="lxColumn infoCard">
      <view class="infoRow lxCenterRow">
        <text class="lx666">活动日期</text> <text class="lx333">{{ tz.date }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动时间</text> <text class="lx333">{{ tz.time }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动地点</text> <text class="lx333">{{ tz.qiuguanName }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动场地</text> <text class="lx333">{{ tz.fields }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动状态</text> <text class="lx333">{{ statusStr }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">发起人</text> <text class="lx333">{{ tz.createdPersonName }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">发起组织</text> <text class="lx333">{{ tz.clubName }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">发起时间</text> <text class="lx333">{{ tz.createTime }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">人数限制</text> <text class="lx333">{{ tz.limitNumber }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">加塞</text> <text class="lx333">{{ tz.limitNumber }}</text>
      </view>


    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  const dateStr = computed(() => {
    return `${tz.value.date}  ${tz.value.time}`
  })
  const statusStr = computed(() => {
    //0未开放 1报名中 2活动已取消 3已截止报名 4活动已结束
    if (tz.value.status == 0) {
      return '未开放'
    } else if (tz.value.status == 1) {
      return '报名中'
    } else if (tz.value.status == 2) {
      return '活动已取消'
    } else if (tz.value.status == 3) {
      return '已截止报名'
    } else {
      return '活动已结束'
    }
  })
</script>

<style lang="scss">
  .infoRow {
    justify-content: space-between;
    min-height: 70rpx;
  }

  .infoCard {
    background-color: white;
    width: 90vw;
    border-radius: 10px;
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.02);
    margin-top: 20px;
    font-size: 15px;
  }
</style>
