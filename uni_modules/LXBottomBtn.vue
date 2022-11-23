<template>
  <view v-if="props.isLeft" class="lxCenterC leftBottomBtn" :style="style" @click="tapBottomBtn">
    {{props.title}}
  </view>
  <view v-else class="lxCenterC rightBottomBtn" :style="style" @click="tapBottomBtn">
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
  const props = defineProps(['title', 'isLeft'])
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
  .leftBottomBtn {
    position: fixed;
    width: 44vw;
    height: 44px;
    background-color: #4685F3;
    font-size: 16px;
    color: white;
    left: 3vw;
    border-radius: 6px;
  }

  .rightBottomBtn {
    position: fixed;
    width: 44vw;
    height: 44px;
    background-color: #4685F3;
    font-size: 16px;
    color: white;
    right: 3vw;
    border-radius: 6px;
  }
</style>
