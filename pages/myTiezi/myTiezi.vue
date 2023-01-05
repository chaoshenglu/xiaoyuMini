<template>
  <view>
    <z-paging ref="paging" v-model="tieziArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(tiezi,index) in tieziArr" :key="tiezi.id">
          <view class="lxColumn" @click="tapCell(tiezi)" @longpress="didLongPress(tiezi)">
            <text class="title">{{tiezi.title}}</text>
            <view class="lxCenterRow" style="margin-top: 3px;margin-bottom: 9px;">
              <uni-tag :text="tiezi.shortQiuGuanName" type="error" size="small"></uni-tag>
              <uni-tag :text="tiezi.time" type="primary" size="small"></uni-tag>
              <uni-tag :text="tiezi.fields" type="success" size="small"></uni-tag>
              <uni-tag :text="tiezi.limitStr" type="warning" size="small"></uni-tag>
            </view>
            <text class="remark">备注：{{tiezi.remark || defaultRemark}}</text>
          </view>
        </view>
      </view>
    </z-paging>
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

  const paging = ref(null)
  const tieziArr = ref([])
  const defaultRemark = '请各位球友根据自身的身体情况控制运动强度，避免出现意外，如在运动中碰伤或突发疾病，组织者不承担任何法律责任。'

  onLoad((option) => {

  })

  const queryList = (pageNo, pageSize) => {
    let uri = `tiezi/getTieZiArr?page=${pageNo}&size=${pageSize}`
    getApp().get(uri).then(res => {
      let arr = res.data.list || []
      for (const tiezi of arr) {
        tiezi.limitStr = `限${tiezi.limitNumber}人`
        if (tiezi.qiuguanName) {
          tiezi.shortQiuGuanName = tiezi.qiuguanName.replace('羽毛球馆', '')
        }
      }
      paging.value.complete(arr)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
      paging.value.complete(false)
    })
  }
</script>

<style lang="scss">
  page {
    background-color: #F6F6F6;
  }

  .remark {
    font-size: 14px;
    color: #666666;
  }

  .uni-tag--small {
    border-radius: 4px !important;
    margin-right: 4px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .title {
    font-size: 16px;
    color: #222222;
  }
</style>
