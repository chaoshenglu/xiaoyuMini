<template>
  <view>
    <z-paging ref="paging" v-model="personArr" @query="queryList" :paging-style="pagingStyle" :default-page-size="20">
      <view class="lxCenterColumn" v-for="(person, index) in personArr" :index="index" :key="index">
        <view class="lxCenterRow listCell" :class="{ firstClass: index===0 }" style="justify-content: space-between;"
          @click="tapCell(person)">
          <view class="lxCenterRow">
            <view class="headBox">
              <image class="head" :src="person.avatar" mode="aspectFill" />
              <image v-if="person.isJiaYi" class="jia" src="/static/jiayi.png" mode="aspectFit" />
              <!-- <image v-else class="vip" src="/static/vipHead.png" mode="aspectFit" /> -->
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
    </z-paging>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  let personArr = ref([])
  const paging = ref(null)
  const pagingStyle = ref({
    marginTop: '32px'
  })

  function tapCell(person) {
    console.log(person.id)
    if (getApp().globalData.openid === 'oNNsT5GULfIM8Yv9cXO7mzKlVsU4') {
      uni.showModal({
        title: '确定删除吗？',
        success: res => {
          if (res.confirm) {
            delPerson(person.id)
          }
        }
      })
    }
  }

  function delPerson(id) {
    let param = {
      personId: id,
      tieziId: tz.value.id
    }
    getApp().post('tz_person/delTZPerson', param).then(res => {
      console.log('delTZPerson', res)
      queryList(1, 20)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  const queryList = (pageNo, pageSize) => {
    let param = {}
    param.page = pageNo
    param.size = pageSize
    param.tieziId = tz.value.id
    getApp().post('tz_person/getTZPerson', param).then(res => {
      let arr = res.data.list || []
      paging.value.complete(arr)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
      paging.value.complete(false)
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

  .firstClass {
    margin-top: 24px !important;
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
