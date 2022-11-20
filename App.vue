<script>
  export default {

    globalData: {
      baseUrl: 'https://www.insist.life:9999/',
      user: null,
      openid: null,
      saveOpenIdTime: null,
    },

    onLaunch: function() {
      this.globalData.openid = uni.getStorageInfoSync('openid') || ''
      this.globalData.saveOpenIdTime = uni.getStorageInfoSync('saveOpenIdTime') || 0
      if (this.globalData.openid && this.globalData.saveOpenIdTime) {
        let nowTime = new Date().getTime()
        let cha = nowTime - this.globalData.saveOpenIdTime
        if (cha > 1000 * 60 * 60) {
          console.log('已经过去了一个小时，需要重新登录')
          this.loginAndGetOpenId()
        } else {
          console.log('一个小时内，无需重新登录，openid=', openid)
        }
      } else {
        this.loginAndGetOpenId()
      }
    },

    onShow: function() {
      console.log('App Show')
    },

    onHide: function() {
      console.log('App Hide')
    },

    methods: {

      loginAndGetOpenId() {
        uni.login({
          success: (res) => {
            let param = {
              code: res.code
            }
            this.get('user/getOpenIdByCode', param).then(resp => {
              this.globalData.openid = resp.data.openid
              this.globalData.saveOpenIdTime = new Date().getTime()
              uni.setStorageSync('openid', this.globalData.openid)
              uni.setStorageSync('saveOpenIdTime', this.globalData.saveOpenIdTime)
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },

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
