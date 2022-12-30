<template>
  <view>
    <uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
      <uni-forms-item label="姓名" required name="name">
        <uni-easyinput v-model="valiFormData.name" placeholder="请输入姓名" />
      </uni-forms-item>
      <uni-forms-item label="年龄" required name="age">
        <uni-easyinput v-model="valiFormData.age" placeholder="请输入年龄" />
      </uni-forms-item>
      <uni-forms-item label="自我介绍" name="introduction">
        <uni-easyinput type="textarea" v-model="valiFormData.introduction" placeholder="请输入自我介绍" />
      </uni-forms-item>
    </uni-forms>
    <button type="primary" @click="submit('valiForm')">提交</button>
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

  const valiForm = ref(null)

  const valiFormData = ref({
    name: '',
    age: '',
    introduction: '',
  })

  const rules = {
    name: {
      rules: [{
        required: true,
        errorMessage: '姓名不能为空'
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

</style>
