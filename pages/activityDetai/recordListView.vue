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
    getApp().get('tz_record/getTZRecord', param).then(res => {
      let oriArr = res.data || []
      for (const item of oriArr) {
        item.title = '这是标题啊'
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
