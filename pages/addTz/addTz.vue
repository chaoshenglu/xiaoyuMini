<template>
  <view class="pageView">
    <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData" :labelWidth="80">
      <uni-forms-item label="日期" required name="date">
        <uni-datetime-picker type="date" :clear-icon="false" v-model="valiFormData.date" />
      </uni-forms-item>
      <uni-forms-item label="时间" required name="time">
        <uni-combox :candidates="candidates" placeholder="请输入活动时间" emptyTips="若无匹配项,请自行手动输入"
          v-model="valiFormData.time">
        </uni-combox>
      </uni-forms-item>
      <uni-forms-item label="飞机时间" required name="stopBaoMingTime">
        <uni-datetime-picker type="datetime" :clear-icon="false" v-model="valiFormData.stopBaoMingTime"
          placeholder="此时过后取消报名将视为飞机" />
      </uni-forms-item>
      <uni-forms-item label="球馆" required name="qiuguanId">
        <uni-data-select v-model="valiFormData.qiuguanId" :localdata="qiuguanRange" placeholder="请选择球馆">
        </uni-data-select>
      </uni-forms-item>
      <uni-forms-item label="组织" required name="clubId">
        <uni-data-select v-model="valiFormData.clubId" :localdata="clubRange" placeholder="请选择组织">
        </uni-data-select>
      </uni-forms-item>
      <uni-forms-item label="场地" required name="selectedFields">
        <scroll-view scroll-y="true" style="height: 80px;">
          <uni-data-checkbox multiple v-model="valiFormData.selectedFields" :localdata="fieldsRange">
          </uni-data-checkbox>
        </scroll-view>
      </uni-forms-item>
      <uni-forms-item label="人数限制" required name="limitNumber">
        <uni-number-box v-model="valiFormData.limitNumber"></uni-number-box>
      </uni-forms-item>
      <uni-forms-item label="备注" name="remark">
        <uni-easyinput type="textarea" :maxlength="100" v-model="valiFormData.remark" placeholder="请输入备注" />
      </uni-forms-item>
    </uni-forms>
    <LXBottomBtn title="提交" @tapBottomBtn="submit" />
  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'

  import {
    onLoad
  } from "@dcloudio/uni-app"
  import dayjs from 'dayjs'

  const valiForm = ref(null)

  const valiFormData = ref({
    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    time: '',
    stopBaoMingTime: '',
    qiuguanName: null,
    qiuguanId: null,
    selectedFields: [],
    limitNumber: 0,
    remark: '',
    clubId: null
  })

  const clubRange = [{
    value: 1,
    text: '后生仔羽毛球俱乐部'
  }, {
    value: 2,
    text: '菜鸟羽毛球俱乐部'
  }]

  const qiuguanRange = [{
    qiuguanName: "颐瑾羽毛球馆",
    qiuguanTinyName: "颐瑾",
    qiuguanId: 1,
    value: 1,
    text: '颐瑾羽毛球馆'
  }, {
    qiuguanName: "鑫富龙羽毛球馆",
    qiuguanTinyName: "鑫富龙",
    qiuguanId: 2,
    value: 2,
    text: '鑫富龙羽毛球馆'
  }]

  const fieldsRange = ref([])

  const candidates = ['09:00-11:00',
    '14:30-16:30',
    '15:00-17:00',
    '15:30-17:30',
    '19:30-21:30',
    '20:00-22:00'
  ]


  const rules = {
    date: {
      rules: [{
        required: true,
        errorMessage: '日期不能为空'
      }]
    },
    time: {
      rules: [{
        required: true,
        errorMessage: '时间不能为空'
      }]
    },
    stopBaoMingTime: {
      rules: [{
        required: true,
        errorMessage: '飞机时间不能为空'
      }]
    },
    qiuguanId: {
      rules: [{
        required: true,
        errorMessage: '球馆不能为空'
      }]
    },
    selectedFields: {
      rules: [{
        required: true,
        errorMessage: '场地不能为空'
      }]
    },
    limitNumber: {
      rules: [{
        required: true,
        errorMessage: '人数限制不能为空'
      }]
    },
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
    valiForm.value.validate().then(res => {
      console.log('success', JSON.stringify(res, null, 2))
      uni.showToast({
        title: `校验通过`
      })
    }).catch(err => {
      console.log('err', err);
    })
  }

  onLoad((option) => {
    createFieldsRange()
  })
</script>

<style lang="scss">
  .pageView {
    padding: 16px;
  }

  .checklist-box {
    margin-right: 15px !important;
  }
</style>
