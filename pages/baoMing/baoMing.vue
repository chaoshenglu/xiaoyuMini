<template>
  <view>
    <uni-popup ref="popup" type="center">
      <Gift :gift="gift" @closePop="closePop" />
    </uni-popup>
  </view>
</template>

<script setup>
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";
  onLoad((option) => {
    console.log("onLoad:", option)
  })
</script>

<style lang="scss">

</style>
