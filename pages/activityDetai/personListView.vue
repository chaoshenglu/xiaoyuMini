<template>
  <view class="lxCenterColumn" style="margin-top: 10px;">
    <view v-for="(person, index) in personArr" :index="index" :key="index">
      <view class="lxCenterRow listCell" style="justify-content: space-between;" @click="tapCell(person)">
        <view class="lxCenterRow">
          <image class="head" :src="person.avatar" mode="aspectFill" />
          <text class="pname lx333">{{person.nickName}}</text>
          <image v-if="person.isGirl" class="gender" src="/static/woman.png" mode="aspectFit"></image>
          <image v-else class="gender" src="/static/man.png" mode="aspectFit"></image>
        </view>
        <text class="lx999" style="font-size: 14px;">{{person.createTime}}</text>
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
    param.tieziId = tz.value.id
    getApp().get('tz_person/getTZPerson', param).then(res => {
      personArr.value = res.data || []
    }).catch(err => {
      console.log(err)
    })
  }
</script>

<style lang="scss">
  .pname {
    margin-left: 6px;
  }

  .head {
    width: 40px;
    height: 40px;
    border-radius: 30px;
  }

  .gender {
    width: 15px;
    height: 15px;
    margin-left: 4px;
  }
</style>
