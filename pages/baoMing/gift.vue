<template>
  <view>
    <uni-popup ref="popup" type="center">
      <view class="gift">
        <image :src="giftImage" mode="aspectFit"></image>
        <text>{{props.gift.name}}</text>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  const giftImage = '/static/gift.png'
  const props = defineProps(['gift'])
</script>


<style lang="scss">
  .gift {
    width: 60vw;
    height: 79vw;
  }
</style>
