<template>
  <view>
    <z-paging ref="paging" v-model="tieziArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(tiezi,index) in tieziArr" :key="tiezi.id" @click="tapCell(tiezi)">
          <text class="title">{{tiezi.title}}</text>
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

  .title {
    font-size: 15px;
    color: #222222;
  }
</style>
