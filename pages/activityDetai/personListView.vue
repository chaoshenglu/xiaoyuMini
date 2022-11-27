<template>
  <view class="lxCenterColumn">

    <view v-for="(person, index) in personArr" :index="index" :key="index">
      <view class="lxCenterRow listCell" @click="tapCell(person)">
        <view class="headBox">
          <image class="head" :src="person.avatar" mode="aspectFill" />
          <image v-if="person.isJiaYi" class="jia" src="/static/jiayi.png" mode="aspectFit" />
          <image v-else class="vip" src="/static/vipHead.png" mode="aspectFit" />
        </view>
        <text class="pname">{{person.nickName}}</text>
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
  let personArr = ref([])
  onMounted(() => {
    getPersonArr()
  })

  function getPersonArr() {
    let param = {}
    param.tieziId = tz.id
    getApp().get('tz_person/getTZPerson', param).then(res => {
      personArr.value = res.data || []
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<style lang="scss">

</style>
