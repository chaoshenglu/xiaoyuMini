<template>
  <view class="lxColumn" style="margin-top: 10px;">

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
      recordArr.value = res.data || []
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<style lang="scss">

</style>
