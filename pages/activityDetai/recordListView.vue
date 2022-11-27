<template>
  <view class="lxColumn" style="padding-top: 20px;width: 100vw;background-color: white;">
    <uni-steps :options="recordArr" active-color="#4685F3" active-icon="smallcircle" :active="recordArr.length-1"
      direction="column" />
  </view>
</template>

<script setup>
  import {
    computed,
    onMounted,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  let recordArr = ref([])

  onMounted(() => {
    getRecordArr()
  })

  function getRecordArr() {
    let param = {}
    param.tieziId = tz.value.id
    // actionType 1报名 2为加一报名 3为自己取消报名 4为自己的加一取消报名 5为其他人取消报名
    getApp().get('tz_record/getTZRecord', param).then(res => {
      let oriArr = res.data || []
      for (const item of oriArr) {
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
        item.desc = item.createTime
      }
      recordArr.value = oriArr
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<style lang="scss">

</style>
