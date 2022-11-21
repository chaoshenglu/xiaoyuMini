<template>
  <view class="lxCenterRow" style="justify-content: space-between;margin-top: 10px;">
    <view class="lxCenterRow">
      <text class="lx666" style="font-size: 16px;margin-right: 4px;">{{user.nickName}}</text>
      <radio-group @change="radioChange" class="lxCenterRow">
        <view v-for="(item, index) in items" :key="item.value" class="lxCenterRow">
          <radio color="#4685F3" style="margin-left: 6px;" :value="item.value" :checked="index === current" />
          <view>{{item.name}}</view>
        </view>
      </radio-group>

    </view>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  let current = ref(0)

  const items = [{
      value: 1,
      name: '男',
    },
    {
      value: 0,
      name: '女'
    }
  ]

  function radioChange(e) {
    console.log(e.detail.value)

  }
</script>

<style lang="scss">

</style>
