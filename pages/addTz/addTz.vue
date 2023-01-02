<template>
  <view class="pageView">
    <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
      <uni-forms-item label="日期" required name="date">
        <uni-datetime-picker type="date" :clear-icon="false" v-model="valiFormData.date" />
      </uni-forms-item>
      <uni-forms-item label="时间" required name="time">
        <uni-combox :candidates="candidates" placeholder="请输入活动时间" emptyTips="若无匹配项,请自行手动输入"
          v-model="valiFormData.time">
        </uni-combox>
      </uni-forms-item>
      <uni-forms-item label="球馆" required name="qiuguanName">
        <uni-data-select v-model="valiFormData.qiuguanName" :localdata="qiuguanRange" placeholder="请选择球馆">
        </uni-data-select>
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
    name: '',
    age: '',
    introduction: '',
    date: dayjs().add(1, 'day').format('YYYY-MM-DD')
  })

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

  const candidates = ['09:00-11:00', '15:00-17:00', '16:00-18:00', '19:00-21:00', '20:00-22:00']

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
    age: {
      rules: [{
        required: true,
        errorMessage: '年龄不能为空'
      }, {
        format: 'number',
        errorMessage: '年龄只能输入数字'
      }]
    }
  }

  function submit() {
    valiForm.value.validate().then(res => {
      console.log('success', res)
      uni.showToast({
        title: `校验通过`
      })
    }).catch(err => {
      console.log('err', err);
    })
  }

  onLoad((option) => {

  })
</script>

<style lang="scss">
  .pageView {
    padding: 20px;
  }
</style>
