<template>
  <view>
    <z-paging ref="paging" v-model="tieziArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(tiezi,index) in tieziArr" :key="tiezi.id" @click="tapCell(tiezi)">
          <text class="title">{{tiezi.title}}</text>
          <view class="lxCenterRow" style="margin-top: 3px;margin-bottom: 9px;">
            <uni-tag :text="tiezi.time" type="primary" size="small"></uni-tag>
            <uni-tag :text="tiezi.fields" type="success" size="small"></uni-tag>
            <uni-tag :text="tiezi.numberProportion" type="warning" size="small"></uni-tag>
            <uni-tag :text="tiezi.statusStr" type="error" size="small"></uni-tag>
          </view>
          <text class="remark">备注：{{tiezi.remark}}</text>
          <view class="lxCenterRow" style="margin-top: 8px;">
            <image class="head" :src="tiezi.createdPersonAvatar || '/static/defaultAvatar.png'" mode="aspectFill" />
            <text class="name">{{tiezi.createdPersonName || '李响'}}</text>
            <text class="name" style="margin-left: 4px;margin-right: 4px;">|</text>
            <text class="name">{{tiezi.qiuguanName || '-'}}</text>
          </view>
        </view>
      </view>
    </z-paging>

    <uni-popup ref="popup" type="center">
      <Gift @closePop="closePop" />
    </uni-popup>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import Gift from '/pages/baoMing/gift.vue'
  import {
    onLoad,
    onShow,
    onHide
  } from "@dcloudio/uni-app";

  const paging = ref(null)
  const popup = ref(null)
  let tieziArr = ref([])

  onShow(() => {
    uni.$on('noGift', function(data) {
      console.log('监听到事件来自 noGift')
      popup.value.open()
    })
  })

  onHide(() => {
    uni.$off('noGift')
  })

  onLoad(() => {

  })

  function onShareAppMessage(res) {

  }

  function closePop() {
    popup.value.close()
  }

  function tapCell(tiezi) {
    uni.navigateTo({
      url: '/pages/baoMing/baoMing?id=' + tiezi.id
    })
  }

  const queryList = (pageNo, pageSize) => {
    let uri = 'tiezi/getTieZiArr'
    getApp().get(uri).then(res => {
      // console.log(JSON.stringify(res.data[0], null, 2))
      let arr = res.data || []
      for (const tiezi of arr) {
        tiezi.numberProportion = `${tiezi.personNumber}/${tiezi.limitNumber}`
        if (tiezi.status == 0) {
          tiezi.statusStr = '未开放'
        } else if (tiezi.status == 1) {
          tiezi.statusStr = '报名中'
        } else if (tiezi.status == 2) {
          tiezi.statusStr = '活动已取消'
        } else if (tiezi.status == 3) {
          tiezi.statusStr = '已截止报名'
        }
      }
      paging.value.complete(res.data || [])
    }).catch(err => {
      console.log(err)
      paging.value.complete(false)
    })
  }
</script>

<style lang="scss">
  page {
    background-color: #F6F6F6;
  }

  .uni-tag--small {
    border-radius: 4px !important;
    margin-right: 4px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .name {
    color: #0D81FF;
    font-size: 14px;
  }

  .head {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    border-radius: 12.5px;
  }

  .remark {
    font-size: 14px;
    color: #666666;
  }

  .title {
    font-size: 16px;
    color: #222222;
  }
</style>
