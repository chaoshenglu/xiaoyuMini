<template>
  <view class="lxCenterColumn">
    <view class="topBar">
      <lgd-tab :tabIndex="tabIndex" :tabValue="tabs" underlineColor="#4685F3" :fontSize="15"
        @getIndex="didChangeTabIndex" />
    </view>
    <activityDetailCard v-if="tiezi && tabIndex === 0" :tiezi="tiezi" />
    <personListView v-if="tiezi && tabIndex === 1" :tiezi="tiezi" />
    <recordListView v-if="tiezi && tabIndex === 2" :tiezi="tiezi" />
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

  import activityDetailCard from '/pages/activityDetai/activityDetailCard.vue'
  import personListView from '/pages/activityDetai/personListView.vue'
  import recordListView from '/pages/activityDetai/recordListView.vue'

  let tabs = ref(['活动信息', '报名人员', '操作记录', '活动费用'])
  let tabIndex = ref(0)
  let tiezi = ref(null)
  let tieziId = ref(null)

  onLoad((option) => {
    tieziId.value = option.tieziId
    getTieZi()
  })

  function getTieZi() {
    let uri = 'tiezi/getTieZiById'
    getApp().get(uri, {
      id: tieziId.value
    }).then(res => {
      console.log('data=', JSON.stringify(res.data, null, 2))
      tiezi.value = res.data
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function didChangeTabIndex(e) {
    tabIndex.value = e
  }
</script>

<style lang="scss">
  page {
    padding-top: 32px;
    background-color: #f6f6f6;
  }

  .topBar {
    position: fixed;
    top: 0px;
    width: 100vw;
    height: 32px;
    box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.1);
    padding-top: 4px;
    z-index: 99997;
    background-color: white;
  }
</style>
