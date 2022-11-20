<template>
  <view class="gift">

  </view>
</template>

<script>
  export default {
    props: {
      gift: {
        type: Object,
        default () {
          return {

          }
        }
      }
    },

    data() {
      return {}
    },

    computed: {

    },

    methods: {

    }
  }
</script>

<style lang="scss">
  .gift {
    position: fixed;
    bottom: 160rpx;
    width: 100vw;
  }
</style>
