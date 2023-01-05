<template>
  <view class="pageView">
    <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData" :labelWidth="85">
      <uni-forms-item label="日期" required name="date">
        <uni-datetime-picker type="date" :clear-icon="false" v-model="valiFormData.date" :disabled="isEdit" />
      </uni-forms-item>
      <uni-forms-item label="时间" required name="time">
        <view class="timeSlotBox lxCenterRow">
          <uni-icons type="calendar" color="#c0c4cc" size="22"></uni-icons>
          <picker mode="time" :value="beginTime" @change="beginTimeChange">
            <view class="lx666 timeSlotText">{{beginTime}}</view>
          </picker>
          <text class="lx666 timeSlotText">至</text>
          <picker mode="time" :value="endTime" @change="endTimeChange">
            <view class="lx666 timeSlotText">{{endTime}}</view>
          </picker>
        </view>
      </uni-forms-item>
      <uni-forms-item label="飞机时间" required name="stopBaoMingTime">
        <uni-datetime-picker type="datetime" :clear-icon="false" v-model="valiFormData.stopBaoMingTime"
          placeholder="此时过后取消报名将视为飞机" />
      </uni-forms-item>
      <uni-forms-item label="飞机扣费" required name="feijiMoney">
        <uni-easyinput type="number" v-model="valiFormData.feijiMoney" placeholder="请输入金额(元)" />
      </uni-forms-item>
      <uni-forms-item v-if="!isVote" label="球馆" required name="qiuguanId">
        <uni-data-select v-model="valiFormData.qiuguanId" :localdata="qiuguanRange" placeholder="请选择球馆" :clear="false"
          :disabled="isEdit">
        </uni-data-select>
      </uni-forms-item>
      <uni-forms-item v-if="isVote" label="球馆选项1" required name="qiuguanId1">
        <uni-data-select v-model="valiFormData.qiuguanId1" :localdata="qiuguanRange" placeholder="请选择球馆" :clear="false"
          :disabled="isEdit">
        </uni-data-select>
      </uni-forms-item>
      <uni-forms-item v-if="isVote" label="球馆选项2" required name="qiuguanId2">
        <uni-data-select v-model="valiFormData.qiuguanId2" :localdata="qiuguanRange" placeholder="请选择球馆" :clear="false"
          :disabled="isEdit">
        </uni-data-select>
      </uni-forms-item>
      <uni-forms-item v-if="clubRange.length" label="组织" name="clubId">
        <uni-data-select v-model="valiFormData.clubId" :localdata="clubRange" placeholder="请选择组织(可选)" :clear="false"
          :disabled="isEdit">
        </uni-data-select>
      </uni-forms-item>
      <uni-forms-item v-if="!isVote" label="场地" name="selectedFields">
        <scroll-view scroll-y="true" style="height: 80px;">
          <uni-data-checkbox multiple v-model="valiFormData.selectedFields" :localdata="fieldsRange"
            @change="changeFields">
          </uni-data-checkbox>
        </scroll-view>
      </uni-forms-item>
      <uni-forms-item label="人数限制" required name="limitNumber">
        <uni-number-box v-model="valiFormData.limitNumber" :min="6" :max="100"></uni-number-box>
      </uni-forms-item>
      <uni-forms-item label="备注" name="remark">
        <uni-easyinput type="textarea" :maxlength="100" v-model="valiFormData.remark" placeholder="请输入备注(可选)" />
      </uni-forms-item>
    </uni-forms>
    <view v-if="isEdit">
      <LXBottomBtn title="保存" @tapBottomBtn="submit" />
    </view>
    <view v-else>
      <HalfBottomBtn title='导入' :isLeft="true" @tapBottomBtn="importTieZi" />
      <HalfBottomBtn title='发布' :isLeft="false" @tapBottomBtn="submit" />
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'

  import {
    onLoad,
    onUnload
  } from "@dcloudio/uni-app"
  import dayjs from 'dayjs'
  import {
    rules
  } from '/pages/addTz/rules.js'

  onUnload(() => {
    uni.$off('importTieZi')
    console.log('⭕️已移除监听 importTieZi')
  })

  const valiForm = ref(null)
  const beginTime = ref('20:00')
  const endTime = ref('22:00')
  const clubRange = ref([])
  const qiuguanRange = ref([])
  const fieldsRange = ref([])
  const isVote = ref(false)
  const isEdit = computed(() => {
    if (valiFormData.value.id) {
      return true
    } else {
      return false
    }
  })

  const zhouJi = computed(() => {
    let num = parseInt(dayjs(valiFormData.value.date).format('d'))
    if (num === 0) {
      return '周日'
    } else if (num === 1) {
      return '周一'
    } else if (num === 2) {
      return '周二'
    } else if (num === 3) {
      return '周三'
    } else if (num === 4) {
      return '周四'
    } else if (num === 5) {
      return '周五'
    } else {
      return '周六'
    }
  })

  const valiFormData = ref({
    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    time: '20:00-22:00',
    stopBaoMingTime: '',
    feijiMoney: null,
    qiuguanName: null,
    qiuguanId: null,
    qiuguanId1: null,
    qiuguanId2: null,
    selectedFields: [],
    limitNumber: 21,
    remark: null,
    clubId: null
  })

  function getClubArr() {
    let str = getApp().globalData.user.clubIdsStr || ''
    let param = {}
    param.page = 1
    param.size = 100
    param.ids = str.split(',')
    getApp().post('club/getClubArr', param).then(res => {
      let arr = res.data.list || []
      let clubs = []
      for (var i = 0; i < arr.length; i++) {
        let item = arr[i]
        clubs.push({
          value: item.id,
          text: item.name
        })
      }
      if (clubs.length) {
        clubRange.value = clubs
      }
    })
  }

  function getQiuguanArr() {
    let param = {}
    param.page = 1
    param.size = 100
    getApp().get('qiuguan/getQiuguanArr', param).then(res => {
      let arr = res.data.list || []
      let qiuguanArr = []
      for (var i = 0; i < arr.length; i++) {
        let item = arr[i]
        qiuguanArr.push({
          value: item.qiuguanId,
          text: item.qiuguanName
        })
      }
      if (qiuguanArr.length) {
        qiuguanRange.value = qiuguanArr
      }
    })
  }

  function beginTimeChange(e) {
    let newBeginValue = e.detail.value
    let begin = `2000-01-01 ${newBeginValue}`
    let end = `2000-01-01 ${endTime.value}`
    let beginDate = dayjs(begin)
    let endDate = dayjs(end)
    if (beginDate.isBefore(endDate) === false) {
      getApp().toast('开始时间应早于结束时间')
    } else {
      beginTime.value = e.detail.value
      valiFormData.value.time = `${beginTime.value}-${endTime.value}`
    }
  }

  function endTimeChange(e) {
    let newEndValue = e.detail.value
    let begin = `2000-01-01 ${beginTime.value}`
    let end = `2000-01-01 ${newEndValue}`
    let beginDate = dayjs(begin)
    let endDate = dayjs(end)
    if (beginDate.isBefore(endDate) === false) {
      getApp().toast('结束时间应晚于开始时间')
    } else {
      endTime.value = e.detail.value
      valiFormData.value.time = `${beginTime.value}-${endTime.value}`
    }
  }

  function findClubNameById(id) {
    for (const club of clubRange.value) {
      if (club.value === id) {
        return club.text
      }
    }
  }

  function findQiuguanNameById(id) {
    for (const qiuguan of qiuguanRange.value) {
      if (qiuguan.value === id) {
        return qiuguan.text
      }
    }
  }

  function find2qiuguan(id1, id2) {
    let qiuguanArr = []
    for (const qiuguan of qiuguanRange.value) {
      if (qiuguan.value === id1 || qiuguan.value === id2) {
        qiuguanArr.push(qiuguan)
      }
    }
    return qiuguanArr
  }

  function createFieldsRange() {
    let arr = []
    for (var i = 1; i <= 42; i++) {
      arr.push({
        text: `${i}号场`,
        value: i
      })
    }
    fieldsRange.value = arr
  }

  function submit() {
    let valiFormDataValue = valiFormData.value
    if (valiFormDataValue.stopBaoMingTime.length === 11) {
      getApp().toast('请选择完整的飞机时间')
      return
    }

    let flyDate = dayjs(valiFormDataValue.stopBaoMingTime)
    let beginDate = dayjs(`${valiFormDataValue.date} ${beginTime.value}`)
    let nowDate = dayjs()

    if (flyDate.isBefore(beginDate) === false) {
      getApp().toast('飞机时间应早于活动时间')
      return
    }
    if (flyDate.isAfter(nowDate) === false) {
      getApp().toast('飞机时间应晚于当前时间')
      return
    }

    let user = getApp().globalData.user
    valiForm.value.validate().then(res => {
      let param = valiFormDataValue
      let chineseDate = dayjs(valiFormDataValue.date).format('M月D日')
      if (valiFormDataValue.clubId) {
        let clubName = findClubNameById(valiFormDataValue.clubId)
        param.clubName = clubName
        let shortClubName = clubName.replace('俱乐部', '').replace('球会', '')
        param.title = `${zhouJi.value}(${chineseDate})${shortClubName}报名帖`
      } else {
        param.title = `${zhouJi.value}(${chineseDate})羽毛球报名帖`
      }
      if (valiFormDataValue.selectedFields.length) {
        param.fields = `${valiFormDataValue.selectedFields.join(',')}号场`
      }
      if (valiFormDataValue.qiuguanId) {
        param.qiuguanName = findQiuguanNameById(valiFormDataValue.qiuguanId)
      } else if (valiFormDataValue.qiuguanId1 && valiFormDataValue.qiuguanId2) {
        let objArr = find2qiuguan(valiFormDataValue.qiuguanId1, valiFormDataValue.qiuguanId2)
        param.qiuguanArr = JSON.stringify(objArr)
      }
      delete param.selectedFields
      if (param.id) {
        updateTieziByParam(param)
      } else {
        param.status = 1
        param.createdPersonId = user.openid
        param.createdPersonName = user.nickName
        param.createdPersonAvatar = user.avatar
        param.personNumber = 1
        addTieziByParam(param)
      }
    }).catch(err => {
      console.log('err', err)
    })
  }

  function alertFinishEdit() {
    uni.showModal({
      title: '保存成功',
      content: '请及时将此变动告知活动参与者',
      showCancel: false,
      confirmText: '我知道了',
      success: res => {
        uni.$emit('didEditTieZi', {
          msg: '帖子已更新，刷新数据吧'
        })
        uni.navigateBack()
      }
    })
  }

  function alertAddSuccess(id) {
    uni.showModal({
      title: '发布成功',
      content: '快转发小程序到微信群吧',
      showCancel: false,
      confirmText: '我知道了',
      success: res => {
        uni.redirectTo({
          url: '/pages/baoMing/baoMing?id=' + id
        })
      }
    })
  }

  function updateTieziByParam(param) {
    console.log('保存-最终参数', JSON.stringify(param, null, 2))
    getApp().post('tiezi/updateTiezi', param).then(res => {
      console.log('updateTiezi res=', res)
      if (res.code === 1) {
        alertFinishEdit()
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function addTieziByParam(param) {
    console.log('新增-最终参数', JSON.stringify(param, null, 2))
    let uri = 'tiezi/addTieZi'
    getApp().post(uri, param).then(res => {
      if (res.code === 1) {
        baoMingForMyself(res.data)
        alertAddSuccess(res.data)
      } else {
        getApp().toastAndConsoleSystemError(res)
      }
    }).catch(err => {
      getApp().toastAndConsoleSystemError(err)
    })
  }

  function baoMingForMyself(tieziId) {
    let param = getApp().globalData.user
    param.isJiaYi = 0
    param.status = 1 //1已报名2已取消3已飞机
    param.tieziId = tieziId
    getApp().post('tz_person/addTZPerson', param).then(res => {
      if (res.code === 1) {
        console.log('为自己报名成功')
      } else {
        console.log('❌为自己报名失败', res)
      }
    }).catch(err => {
      console.log('❌为自己报名失败', err)
    })
  }

  function changeFields(e) {
    let arr = e.detail.value
    valiFormData.value.limitNumber = arr.length * 7
  }

  function importTieZi() {
    uni.navigateTo({
      url: '/pages/myTiezi/myTiezi'
    })
  }

  function useImportData(tiezi) {
    let qiuguanArrStr = tiezi.qiuguanArr || ''
    isVote.value = qiuguanArrStr.length > 0
    valiFormData.value = tiezi
    valiFormData.value.date = dayjs().add(1, 'day').format('YYYY-MM-DD')
    valiFormData.value.stopBaoMingTime = valiFormData.value.date + tiezi.stopBaoMingTime.slice(10, 19)
    valiFormData.value.id = null
    createSelectedFieldsByFields()
  }

  function createSelectedFieldsByFields() {
    if (valiFormData.value.fields) {
      let str = valiFormData.value.fields.replace('号场', '')
      let strArr = str.split(',')
      let idArr = []
      for (const idstr of strArr) {
        idArr.push(parseInt(idstr))
      }
      valiFormData.value.selectedFields = idArr
    } else {
      valiFormData.value.selectedFields = []
    }
  }

  onLoad((option) => {
    uni.$on('importTieZi', data => {
      useImportData(data)
    })

    createFieldsRange()
    getClubArr()
    getQiuguanArr()
    if (option.isVote === '1') {
      isVote.value = true
    }
    if (option.tiezi) {
      uni.setNavigationBarTitle({
        title: '编辑活动'
      })
      valiFormData.value = JSON.parse(option.tiezi)
      createSelectedFieldsByFields()
    }
  })
</script>

<style lang="scss">
  page {
    padding-bottom: 100px;
  }

  .pageView {
    padding: 16px;
  }

  .checklist-box {
    margin-right: 15px !important;
  }

  .timeSlotBox {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    height: 36px;
    padding-left: 10px;
  }

  .timeSlotText {
    margin-left: 10px;
  }
</style>
