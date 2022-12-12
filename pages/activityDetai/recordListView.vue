<template>
  <view>
    <z-paging ref="paging" v-model="recordArr" @query="queryList" :paging-style="pagingStyle" :default-page-size="20">
      <view class="lxCenterColumn" v-for="(record, index) in recordArr" :index="index" :key="index">
        <view class="lxCenterRow listCell" :class="{ firstClass: index===0 }" style="justify-content: space-between;"
          @click="tapCell(record)">
          <view v-if="record.qiuguanTinyName" class="lxCenterRow">
            <text class="lx333" style="font-size: 14px;">{{record.title}}</text>
            <text class="lx999" style="font-size: 12px;margin-left: 3px;">[{{record.qiuguanTinyName}}]</text>
          </view>
          <text v-else class="lx333" style="font-size: 14px;">{{record.title}}</text>
          <text class="lx999" style="font-size: 14px;">{{record.createTime.slice(0,16)}}</text>
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
  const qiuguanArr = computed(() => {
    if (props.tiezi.qiuguanArr) {
      return JSON.parse(props.tiezi.qiuguanArr)
    } else {
      return []
    }
  })
  let recordArr = ref([])
  const paging = ref(null)
  const pagingStyle = ref({
    marginTop: '32px'
  })

  const queryList = (pageNo, pageSize) => {
    let param = {}
    param.tieziId = tz.value.id
    param.page = pageNo
    param.size = pageSize
    // actionType 1报名 2为加一报名 3为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
    getApp().get('tz_record/getTZRecord', param).then(res => {
      let arr = res.data.list || []
      for (const item of arr) {

        for (const qiuguan of qiuguanArr.value) {
          if (item.qiuguanId === qiuguan.qiuguanId) {
            item.qiuguanTinyName = qiuguan.qiuguanTinyName
          }
        }

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
