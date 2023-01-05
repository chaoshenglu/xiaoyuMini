<template>
  <view>
    <z-paging ref="paging" v-model="tieziArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(tiezi,index) in tieziArr" :key="tiezi.id">
          <view class="lxColumn" style="padding-bottom: 8px;" @click="tapCell(tiezi)" @longpress="didLongPress(tiezi)">
            <text class="title">{{tiezi.title}}</text>
            <view class="lxCenterRow" style="margin-top: 3px;margin-bottom: 9px;">
              <uni-tag :text="tiezi.time" type="primary" size="small"></uni-tag>
              <uni-tag v-if="tiezi.fields" :text="tiezi.fields" type="success" size="small"></uni-tag>
              <uni-tag :text="tiezi.numberProportion" type="warning" size="small"></uni-tag>
              <uni-tag :text="tiezi.statusStr" type="error" size="small"></uni-tag>
            </view>
            <text class="remark">备注：{{tiezi.remark || '请各位球友根据自身的身体情况控制运动强度，避免出现意外，如在运动中碰伤或突发疾病，组织者不承担任何法律责任。'}}</text>
          </view>
          <view class="lxCenterRow">
            <image class="head" @click="tapName(tiezi)" :src="tiezi.createdPersonAvatar || '/static/defaultAvatar.png'"
              mode="aspectFill" />
            <text class="name" @click="tapName(tiezi)">{{tiezi.createdPersonName || '李响'}}</text>
            <text v-if="tiezi.qiuguanName" class="name" style="margin-left: 4px;margin-right: 4px;">|</text>
            <text v-if="tiezi.qiuguanName" @click="tapQiuGuan(tiezi)" class="name">{{tiezi.qiuguanName}}</text>
            <view style="flex: 1;height: 100%;color: white" @click="tapCell(tiezi)">方便点击</view>
          </view>
        </view>
      </view>
    </z-paging>

    <uni-popup ref="popup" type="center">
      <Gift @closePop="closePop" />
    </uni-popup>

    <uni-fab ref="fab" :content="tieziTypes" direction="vertical" horizontal="right" @trigger="trigger"></uni-fab>

  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue';
  import Gift from '/pages/baoMing/gift.vue'
  import {
    onLoad,
    onShow,
    onHide
  } from "@dcloudio/uni-app"

  const paging = ref(null)
  const popup = ref(null)
  const fab = ref(null)
  const tieziArr = ref([])
  import {
    tieziTypes
  } from '/pages/index/tieziTypes.js'

  onShow(() => {
    uni.$on('noGift', function(data) {
      console.log('监听到事件来自 noGift')
      popup.value.open()
    })

    if (tieziArr.value.length > 0) {
      queryList(1, 10)
    }
  })

  onHide(() => {
    uni.$off('noGift')
  })

  onLoad(() => {

  })

  function alertUserInfo() {
    uni.showModal({
      title: '温馨提示',
      content: '发帖前，请先设置您的个人信息',
      success: res => {
        if (res.confirm) {
          uni.navigateTo({
            url: '/pages/myInfo/myInfo'
          })
        }
      }
    })
  }

  function trigger(e) {
    fab.value.close()
    if (!getApp().globalData.user || !getApp().globalData.user.nickName) {
      alertUserInfo()
      return
    }
    if (e.index === 0) {
      uni.navigateTo({
        url: '/pages/addTz/addTz'
      })
    } else if (e.index === 1) {
      uni.navigateTo({
        url: '/pages/addTz/addTz?isVote=1'
      })
    } else if (e.index === 2) {

    } else if (e.index === 3) {

    }
  }

  function tapName(tiezi) {
    if (tiezi.createdPersonId) {
      let uri = 'user/getUserInfo'
      getApp().get(uri, {
        openid: tiezi.createdPersonId
      }).then(res => {
        let arr = res.data || []
        let theUser = arr[0] || {}
        if (theUser.wxQrcode) {
          wx.previewMedia({
            sources: [{
              url: theUser.wxQrcode,
              type: 'image'
            }],
            current: 0
          })
        }
      }).catch(err => {
        getApp().toastAndConsoleSystemError(err)
      })
    }
  }

  function tapQiuGuan(tiezi) {
    if (tiezi.qiuguanId) {
      let uri = 'qiuguan/getQiuGuanDetail'
      getApp().get(uri, {
        qiuguanId: tiezi.qiuguanId
      }).then(res => {
        let qiuguan = res.data || {}
        if (qiuguan.qiuguanLat && qiuguan.qiuguanLon) {
          wx.openLocation({
            latitude: parseFloat(qiuguan.qiuguanLat),
            longitude: parseFloat(qiuguan.qiuguanLon),
            name: tiezi.qiuguanName
          })
        }
      }).catch(err => {
        getApp().toastAndConsoleSystemError(err)
      })
    }
  }

  function onShareAppMessage(res) {

  }

  function closePop() {
    popup.value.close()
  }

  function tapCell(tiezi) {
    if (tiezi.qiuguanArr) {
      uni.navigateTo({
        url: '/pages/baoMing2/baoMing2?id=' + tiezi.id
      })
    } else {
      uni.navigateTo({
        url: '/pages/baoMing/baoMing?id=' + tiezi.id
      })
    }
  }

  function didLongPress(tiezi) {
    if (getApp().globalData.openid === 'oNNsT5GULfIM8Yv9cXO7mzKlVsU4') {
      uni.showModal({
        title: '确定删除吗？',
        success: res => {
          if (res.confirm) {
            delTieZi(tiezi)
          }
        }
      })
    }
  }

  function delTieZi(tiezi) {
    let param = {
      id: tiezi.id
    }
    getApp().post('tiezi/delTieZi', param).then(res => {
      console.log('delTieZi', res)
      paging.value.reload()
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  const queryList = (pageNo, pageSize) => {
    let uri = `tiezi/getTieZiArr?page=${pageNo}&size=${pageSize}`
    getApp().get(uri).then(res => {
      // console.log(JSON.stringify(res.data[0], null, 2))
      let arr = res.data.list || []
      for (const tiezi of arr) {
        tiezi.numberProportion = `${tiezi.personNumber}/${tiezi.limitNumber}`
        if (tiezi.status == 0) {
          tiezi.statusStr = '未开放'
        } else if (tiezi.status == 1) {
          let qiuguanArr = tiezi.qiuguanArr || ''
          tiezi.statusStr = qiuguanArr.length ? '投票中' : '报名中'
        } else if (tiezi.status == 2) {
          tiezi.statusStr = '活动已取消'
        } else if (tiezi.status == 3) {
          tiezi.statusStr = '已截止报名'
        }
      }
      paging.value.complete(arr)
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
      paging.value.complete(false)
    })
  }
</script>

<style lang="scss">
  page {
    background-color: #F6F6F6;
  }

  .uni-tag--small {
    border-radius: 4px !important;
    margin-right: 4px;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }

  .name {
    color: #0D81FF;
    font-size: 14px;
  }

  .head {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    border-radius: 12.5px;
  }

  .remark {
    font-size: 14px;
    color: #666666;
  }

  .title {
    font-size: 16px;
    color: #222222;
  }
</style>
