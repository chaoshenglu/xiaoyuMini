<template>
  <view>
    <z-paging ref="paging" v-model="tieziArr" @query="queryList">
      <view class="lxCenterColumn">
        <view class="listCell lxColumn" v-for="(tiezi,index) in tieziArr" @click="tapCell(tiezi)">
          <text>{{tiezi.title}}</text>
          <text>{{tiezi.title}}</text>
          <text>{{tiezi.title}}</text>
          <text>{{tiezi.title}}</text>
        </view>
      </view>
    </z-paging>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        tieziArr: []
      }
    },

    onLoad() {

    },

    computed: {

    },

    methods: {
      queryList() {
        let uri = 'tiezi/getTieZiArr'
        getApp().get(uri).then(res => {
          let arr = res.data || []
          this.$refs.paging.complete(arr)
        }).catch(err => {
          console.log(err)
        })
      },

      tapCell(tiezi) {

      },
    }
  }
</script>

<style lang="scss">

</style>
