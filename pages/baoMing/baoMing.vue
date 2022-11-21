<template>
  <view>
    <uni-popup ref="popup" type="center">
      <Gift :gift="gift" @closePop="closePop" />
    </uni-popup>
  </view>
</template>

<script setup>
  import Gift from '/pages/baoMing/gift.vue'
  import {
    onLoad,
    onShow
  } from "@dcloudio/uni-app";
  const popup = ref(null)
  onLoad((option) => {
    console.log("onLoad:", option)
  })
  onShow(() => {
    uni.$on('noGift', function(data) {
      console.log('监听到事件来自 noGift')
      popup.value.open()
    })
  })

  onHide(() => {
    uni.$off('noGift')
  })
</script>

<style lang="scss">

</style>
