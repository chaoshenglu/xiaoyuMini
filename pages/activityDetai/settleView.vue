<template>
  <view class="lxColumn">
    <view v-if="tiezi.isSettled === 1">
      已结算
    </view>
    <view v-else class="emptySettle lxCenterC">
      <view>
        <uni-data-checkbox mode="tag" multiple v-model="checkboxValue" :localdata="hobby"></uni-data-checkbox>
      </view>
    </view>
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
  const checkboxValue = ref([])
  const hobby = [{
    text: '足球',
    value: 0
  }, {
    text: '篮球',
    value: 1
  }, {
    text: '游泳',
    value: 2
  }]
</script>

<style lang="scss">
  .emptySettle {
    color: #999999;
    font-size: 15px;
    width: 100vw;
    height: 100vw;
  }
</style>
