<template>
  <view class="lxColumn">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <view style="padding: 20px;">
      <uni-forms ref="valiForm" :modelValue="valiFormData">
        <uni-forms-item label="昵称" name="nickName">
          <input type="nickname" placeholder="请输入昵称" />
        </uni-forms-item>
        <uni-forms-item label="性别" name="isGirl">
          <uni-data-checkbox v-model="valiFormData.isGirl" :localdata="genderArr"></uni-data-checkbox>
        </uni-forms-item>
      </uni-forms>
    </view>
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

  const valiFormData = ref({
    avatar: null,
    nickName: null,
    isGirl: null
  })

  const genderArr = [{
    value: 0,
    text: '男'
  }, {
    value: 1,
    text: '女'
  }]

  onLoad((option) => {

  })
</script>

<style lang="scss">
  .avatar-wrapper {
    padding: 0;
    width: 56px !important;
    border-radius: 8px;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .avatar {
    display: block;
    width: 56px;
    height: 56px;
  }
</style>
