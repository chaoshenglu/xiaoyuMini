<script>
  export default {

    globalData: {
      baseUrl: 'https://www.insist.life:9999/',
      user: null,
      openid: null,
      saveOpenIdTime: null,
    },

    onLaunch: function() {
      this.globalData.user = uni.getStorageSync('user') || {}
      this.globalData.openid = uni.getStorageSync('openid') || ''
      this.globalData.saveOpenIdTime = uni.getStorageSync('saveOpenIdTime') || 0
      if (this.globalData.openid && this.globalData.saveOpenIdTime) {
        let nowTime = new Date().getTime()
        let cha = nowTime - this.globalData.saveOpenIdTime
        if (cha > 1000 * 60 * 60) {
          console.log('已经过去了一个小时，需要重新登录')
          this.loginAndGetOpenId()
        } else {
          console.log('一个小时内，无需重新登录，openid=', this.globalData.openid)
          this.getUserInfo(this.globalData.openid)
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
              let dataStr = resp.data || ''
              let dataJson = JSON.parse(dataStr)
              this.globalData.openid = dataJson.openid
              this.globalData.saveOpenIdTime = new Date().getTime()
              uni.setStorageSync('openid', this.globalData.openid)
              uni.setStorageSync('saveOpenIdTime', this.globalData.saveOpenIdTime)
              this.getUserInfo(this.globalData.openid)
            }).catch(err => {
              console.log(err)
            })
          }
        })
      },

      // 查看数据库中是否已经存在此人，若没有，要加进来
      getUserInfo(openid) {
        let param = {
          openid
        }
        this.get('user/getUserInfoByOpenid', param).then(res => {
          let userArr = res.data || []
          if (userArr.length > 0) {
            this.globalData.user = userArr[0]
            uni.setStorageSync('user', this.globalData.user)
            console.log('this.globalData.user', this.globalData.user)
            let gift = this.globalData.user.gift || 0
            if (gift === 0) {
              console.log('还没有收到新用户红包')
              uni.$emit('noGift')
            }
          } else {
            this.addUserByOpenId(param)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      addUserByOpenId(param) {
        this.get('user/addUserByOpenId', param).then(res => {
          if (res.code === 1) {
            console.log('新增用户成功，通过openid初始化')
            uni.$emit('noGift')
          } else {
            console.log('❌新增用户成功失败', res)
          }
        }).catch(err => {
          console.log(err)
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
