<script>
  export default {
    onLaunch: function() {
      console.log('App Launch')
    },
    onShow: function() {
      console.log('App Show')
    },
    onHide: function() {
      console.log('App Hide')
    },

    globalData: {
      baseUrl: 'https://www.insist.life:9999/',
      user: null,
    },

    methods: {
      get(uri, param) {
        let url = this.globalData.baseUrl + uri
        console.log('🔽网络请求Get=>', url)
        console.log('参数=>', JSON.stringify(param))
        let promise = new Promise(function(resolve, reject) {
          uni.request({
            url: url,
            data: param,
            method: 'GET',
            success: res => {
              console.log(uri, '🔼接口返回=>', res.data)
              resolve(res.data)
            },
            fail: err => {
              console.log(uri, '🔼请求失败=>', err)
              reject(err)
            }
          })
        })
        return promise
      },
    }

  }
</script>

<style lang="scss">

</style>
