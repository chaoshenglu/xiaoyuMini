<template>
  <view>
    <z-paging ref="paging" v-model="tieziArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(tiezi,index) in tieziArr" :key="tiezi.id" @click="tapCell(tiezi)">
          <text class="title">{{tiezi.title}}</text>
          <view class="lxCenterRow">
            <uni-tag :text="tiezi.time" type="primary" size="small"></uni-tag>
            <uni-tag text="标签" type="success" size="small"></uni-tag>
            <uni-tag text="标签" type="warning" size="small"></uni-tag>
            <uni-tag text="标签" type="error" size="small"></uni-tag>
          </view>
          <text>{{tiezi.title}}</text>
          <text>{{tiezi.title}}</text>
          <text>{{tiezi.title}}</text>
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
  let tieziArr = ref([])

  const queryList = (pageNo, pageSize) => {
    let uri = 'tiezi/getTieZiArr'
    getApp().get(uri).then(res => {
      console.log(JSON.stringify(res.data[0], null, 2))
      paging.value.complete(res.data || [])
    }).catch(res => {
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

  .title {
    font-size: 16px;
    color: #222222;
    margin-top: 6px;
  }
</style>
