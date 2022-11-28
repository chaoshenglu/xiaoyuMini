<template>
  <view class="lxColumn" style="padding-top: 20px;width: 100vw;height:100vh;background-color: white;">
    <image :src="src" mode="aspectFit" style="width: 100vw;height: 100vw;"></image>
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
  let src = ref('https://xiaoyu-mini.oss-cn-guangzhou.aliyuncs.com/settle/empty.jpg')

  onMounted(() => {
    src.value = `https://xiaoyu-mini.oss-cn-guangzhou.aliyuncs.com/settle/empty.jpg?time=${new Date().getTime()}`
  })

  // function getRecordArr() {
  //   let param = {}
  //   param.tieziId = tz.value.id
  //   getApp().get('', param).then(res => {

  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }
</script>

<style lang="scss">

</style>
