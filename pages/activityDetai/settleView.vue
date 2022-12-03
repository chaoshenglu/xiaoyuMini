<template>
  <view class="lxColumn">
    <view v-if="tiezi.isSettled === 1">
      已结算
    </view>
    <view v-else style="padding-top: 10px;">
      <view v-if="canSettle" class="lxCheckBox lxColumn">
        <uni-data-checkbox multiple v-model="checkboxValue" :localdata="hobby"></uni-data-checkbox>
      </view>
      <view v-else class="emptySettle lxCenterC">
        未结算
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

  const canSettle = computed(() => {
    return false
  })

  const hobby = [{
    text: '足球',
    value: 0
  }, {
    text: '篮球',
    value: 1
  }, {
    text: '游泳',
    value: 2
  }, {
    text: '足球',
    value: 3
  }, {
    text: '篮球',
    value: 4
  }, {
    text: '游泳',
    value: 5
  }, {
    text: '足球',
    value: 6
  }, {
    text: '篮球',
    value: 7
  }, {
    text: '游泳',
    value: 8
  }]
</script>

<style lang="scss">
  .emptySettle {
    color: #999999;
    font-size: 16px;
    width: 100vw;
    height: 100vw;
  }

  .lxCheckBox {
    transform: scale(1.2);
    width: 80vw;
    margin-left: 7vw;
  }
</style>
