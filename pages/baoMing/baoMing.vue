<template>
  <view>
    <uni-popup ref="popup" type="center">
      <Gift @closePop="closePop" />
    </uni-popup>
    <uni-grid :column="4" :highlight="true" @change="change">
      <uni-grid-item v-for="(person, index) in personArr" :index="index" :key="index">
        <view class="grid-item-box" style="background-color: #fff;">
          <image :src="person.avatar" mode="aspectFit" style="width: 30px;height: 30px;"></image>
          <text class="text">{{person.nickName}}</text>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script setup>
  import Gift from '/pages/baoMing/gift.vue'

  import {
    ref
  } from 'vue';

  import {
    onLoad,
    onShow,
    onHide
  } from "@dcloudio/uni-app";

  const popup = ref(null)
  let personArr = ref([])

  onLoad((option) => {
    getApp().get('getTZPerson').then(res => {
      personArr.value = res.data || []
    }).catch(err => {
      console.log(err)
    })
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
