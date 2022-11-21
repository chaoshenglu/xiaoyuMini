<template>
  <view>
    <uni-popup ref="popup" type="center">
      <Gift @closePop="closePop" />
    </uni-popup>
    <view style="margin-left: 8px;margin-right: 8px;margin-top: 8px;">
      <uni-grid :column="4" :highlight="true" @change="change" :showBorder="false" :square="false">
        <uni-grid-item v-for="(person, index) in personArr" :index="index" :key="index">
          <view class="lxCenterR cell" :class="{ 'boyClass': person.isBoy === 1}">
            <image class="head" :src="person.avatar" mode="aspectFit"></image>
            <text v-if="person.nickName.length < 3" class="pname">{{person.nickName}}</text>
            <text v-else class="pname">{{person.nickName.slice(0,2)}}</text>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>

    <LXBottomBtn title='报名' />
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
    getApp().get('tz_person/getTZPerson').then(res => {
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

  function closePop() {
    popup.value.close()
  }

  onHide(() => {
    uni.$off('noGift')
  })
</script>

<style lang="scss">
  .pageView {
    width: 100vw;
    height: 100vh;
  }

  .pname {
    margin-left: 6px;
    color: white;
  }

  .boyClass {
    background-color: #4685F3 !important;
  }

  .cell {
    background-color: #FD5FA9;
    border-radius: 6px;
    margin: 5px;
    padding: 5px;
  }

  .head {
    width: 26px;
    height: 26px;
    border-radius: 13px;
  }
</style>
