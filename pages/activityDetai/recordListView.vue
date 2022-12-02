<template>
  <view>
    <z-paging ref="paging" v-model="recordArr" @query="queryList" paging-style="margin-top: 32px;"
      :default-page-size="20">
      <view class="lxCenterColumn" v-for="(record, index) in recordArr" :index="index" :key="index">
        <view class="lxCenterRow listCell" :class="{ firstClass: index===0 }" style="justify-content: space-between;"
          @click="tapCell(record)">
          <text class="lx333" style="font-size: 14px;">{{record.title}}</text>
          <text class="lx999" style="font-size: 14px;">{{record.createTime}}</text>
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
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  let recordArr = ref([])
  const paging = ref(null)

  const queryList = (pageNo, pageSize) => {
    let param = {}
    param.tieziId = tz.value.id
    param.page = pageNo
    param.size = pageSize
    // actionType 1报名 2为加一报名 3为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
    getApp().get('tz_record/getTZRecord', param).then(res => {
      let arr = res.data.list || []
      for (const item of arr) {
        if (item.actionType === 1) {
          item.title = item.nickName + '报名'
        } else if (item.actionType === 2) {
          item.title = item.nickName + `报名+1（${item.onNickName})`
        } else if (item.actionType === 3) {
          item.title = item.nickName + '取消了报名'
        } else if (item.actionType === 4) {
          item.title = item.nickName + `取消了+1（${item.onNickName}）`
        } else if (item.actionType === 5) {
          item.title = item.nickName + `将${item.onNickName}从帖子中移除`
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
  .firstClass {
    margin-top: 24px !important;
  }
</style>
