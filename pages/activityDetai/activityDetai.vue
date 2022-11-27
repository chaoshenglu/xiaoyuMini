<template>
  <view style="width: 100vw;">
    <lgd-tab v-model="tabIndex" :tabValue="tabs" underlineColor="#4685F3" fontSize="14" @change="didChangeTabIndex" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabs: ['活动信息', '报名人员', '操作记录', '活动费用'],
        tabIndex: 0
      }
    },
    methods: {
      didChangeTabIndex(e) {
        console.log(e)
      },
    }
  }
</script>

<style lang="scss">

</style>
