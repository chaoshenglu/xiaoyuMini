<template>
  <view class="lxCenterColumn" style="margin-top: 10px;">
    <view v-for="(person, index) in personArr" :index="index" :key="index">
      <view class="lxCenterRow listCell" style="justify-content: space-between;" @click="tapCell(person)">
        <view class="lxCenterRow">
          <view class="headBox">
            <image class="head" :src="person.avatar" mode="aspectFill" />
            <image v-if="person.isJiaYi" class="jia" src="/static/jiayi.png" mode="aspectFit" />
            <image v-else class="vip" src="/static/vipHead.png" mode="aspectFit" />
          </view>
          <text class="pname lx333">{{person.nickName}}</text>
          <image v-if="person.isGirl" class="gender" src="/static/woman.png" mode="aspectFit"></image>
          <image v-else class="gender" src="/static/man.png" mode="aspectFit"></image>
        </view>
        <view class="lxColumn" style="align-items:flex-end;">
          <text class="lx999" style="font-size: 14px;">{{person.createTime}}</text>
          <uni-tag v-if="person.status===2" text="已取消" type="warning" size="small"></uni-tag>
          <uni-tag v-if="person.status===3" text="已飞机" type="error" size="small"></uni-tag>
        </view>
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

  .uni-tag--small {
    border-radius: 4px !important;
    margin-right: 4px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .headBox {
    width: 40px;
    height: 40px;
    position: relative;
  }

  .vip {
    position: absolute;
    top: -5px;
    right: -1px;
    width: 40px;
    height: 40px;
  }

  .jia {
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    height: 15px;
  }

  .head {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  .gender {
    width: 15px;
    height: 15px;
    margin-left: 4px;
  }
</style>
