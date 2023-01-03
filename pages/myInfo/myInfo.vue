<template>
  <view class="lxColumn">
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatarImg" :src="valiFormData.avatar || '/static/defaultAvatar.png'"></image>
    </button>
    <view>
      <uni-forms ref="valiForm" :modelValue="valiFormData">
        <view class="lx100vwLine" />
        <uni-forms-item label="昵称" name="nickName">
          <input type="nickname" placeholder="请输入昵称" style="margin-top: 6px;" />
        </uni-forms-item>
        <view class="lx100vwLine" />
        <uni-forms-item label="性别" name="isGirl">
          <view style="margin-top: 5px;">
            <uni-data-checkbox v-model="valiFormData.isGirl" :localdata="genderArr">
            </uni-data-checkbox>
          </view>
        </uni-forms-item>
        <view class="lx100vwLine" />
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
    border-style: none !important;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  .uni-forms-item {
    margin-bottom: 10px !important;
    margin-top: 10px !important;
    padding-left: 20px !important;
  }

  .uni-forms-item__label {
    font-weight: 400;
    color: #333333 !important;
    font-size: 16px !important;
  }

  button::after {
    border-style: none !important;
  }

  .avatarImg {
    display: block;
    width: 56px;
    height: 56px;
  }
</style>
