<template>
  <view class="listCell">
    <view class="lxColumn">
      <text>test</text>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tieziArr: [{
          title: '周二(11月22日)后生仔报名帖',
          time: '20:00-22:00',
          fields: [1, 2, 3, 4, 5, 6],
          limitNumber: 27,
          personNumber: 3,
          status: 1,
          remark: '入场时须扫描球馆场所码，持绿码进场。'
        }]
      }
    },

    onLoad() {
      this.requestList()
    },

    computed: {

    },

    methods: {
      requestList() {
        let uri = 'tiezi/getTieZiArr'
        getApp().get(uri).then(res => {

        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
