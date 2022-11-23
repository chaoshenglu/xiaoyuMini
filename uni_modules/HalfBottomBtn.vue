<template>
  <view class="lxCenterC lxBottomBtn" :style="style" @click="tapBottomBtn">
    {{props.title}}
  </view>
  <view>

  </view>
</template>

<script setup>
  import {
    onMounted,
    computed,
    ref
  } from 'vue'
  const props = defineProps(['title'])
  const emit = defineEmits(['tapBottomBtn'])
  let bottomOffset = ref(0)
  const style = computed(() => {
    return {
      bottom: `${bottomOffset.value}px`
    }
  })

  onMounted(() => {
    try {
      const safeAreaInsets = uni.getWindowInfo().safeAreaInsets || {}
      bottomOffset.value = safeAreaInsets.bottom || 10
    } catch (e) {
      bottomOffset.value = 34
    }
  })

  function tapBottomBtn() {
    emit('tapBottomBtn')
  }
</script>

<style lang="scss">
  .lxBottomBtn {
    position: fixed;
    width: 94vw;
    height: 44px;
    background-color: #4685F3;
    font-size: 16px;
    color: white;
    left: 3vw;
    border-radius: 6px;
  }
</style>
