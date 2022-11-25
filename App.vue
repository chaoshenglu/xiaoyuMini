<script>
  export default {

    globalData: {
      baseUrl: 'https://www.insist.life:9999/',
      user: null,
      openid: null,
      saveOpenIdTime: null,
      gift: null,
      penddingGift: null,
      saveOssTime: null,
      ossConfig: null,
    },

    onLaunch: function() {
      this.globalData.user = uni.getStorageSync('user') || {}
      this.onLaunch_checkGift()
      this.onLaunch_checkOSS()
      this.onLaunch_checkOpenId()
    },

    methods: {

      onLaunch_checkOpenId() {
        this.globalData.openid = uni.getStorageSync('openid') || ''
        this.globalData.saveOpenIdTime = uni.getStorageSync('saveOpenIdTime') || 0
        if (this.globalData.openid && this.globalData.saveOpenIdTime) {
          let nowTime = new Date().getTime()
          let cha = nowTime - this.globalData.saveOpenIdTime
          if (cha > 1000 * 60 * 60 * 24) {
            console.log('已经过去了24小时，需要重新登录')
            this.loginAndGetOpenId()
          } else {
            console.log('24小时内，无需重新登录，openid=', this.globalData.openid)
            this.getUserInfo(this.globalData.openid)
          }
        } else {
          console.log('第一次获取openid')
          this.loginAndGetOpenId()
        }
      },

      onLaunch_checkOSS() {
        this.globalData.ossConfig = uni.getStorageSync('ossConfig')
        this.globalData.saveOssTime = uni.getStorageSync('saveOssTime') || 0
        if (this.globalData.ossConfig && this.globalData.saveOssTime) {
          let nowTime = new Date().getTime()
          let cha = nowTime - this.globalData.saveOssTime
          if (cha > 1000 * 60 * 60 * 6) {
            console.log('已经过去了6个小时，需要刷新oss')
            this.requestOssConfig()
          } else {
            console.log('6小时内，无需刷新oss')
          }
        } else {
          console.log('第一次请求oss')
          this.requestOssConfig()
        }
      },

      onLaunch_checkGift() {
        this.globalData.gift = uni.getStorageSync('gift') || {}
        if (!this.globalData.gift.money) {
          this.globalData.gift = {
            name: '新用户专享红包',
            money: this.randomNum(1, 9)
          }
          uni.setStorageSync('gift', this.globalData.gift)
        }
      },

      requestOssConfig() {
        this.get('user/getWxToken').then(res => {
          let access_token = res.data.access_token || ''
          this.get('user/getOssConfig', {
            access_token
          }).then(resp => {
            let resp_data_str = resp.data.resp_data || ''
            let config = JSON.parse(resp_data_str)
            this.globalData.ossConfig = config
            this.globalData.saveOssTime = new Date().getTime()
            uni.setStorageSync('ossConfig', this.globalData.ossConfig)
            uni.setStorageSync('saveOssTime', this.globalData.saveOssTime)
          }).catch(err => {
            getApp().toastAndConsoleSystemError(err)
          })
        }).catch(err => {
          getApp().toastAndConsoleSystemError(err)
        })
      },

      toast(title) {
        uni.showToast({
          title: title,
          icon: 'none'
        })
      },

      randomNum(minNum, maxNum) {
        switch (arguments.length) {
          case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
          case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
          default:
            return 0;
            break;
        }
      },

      toastAndConsoleSystemError(err) {
        console.log(err)
        let errStr = JSON.stringify(err)
        uni.showToast({
          title: `系统出错：${errStr}`,
          icon: 'none'
        })
      },

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
              getApp().toastAndConsoleSystemError(err)
            })
          }
        })
      },

      // 查看数据库中是否已经存在此人，若没有，要加进来
      getUserInfo(openid) {
        let param = {
          openid
        }
        this.get('user/getUserInfo', param).then(res => {
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
          getApp().toastAndConsoleSystemError(err)
        })
      },

      addUserByOpenId(param) {
        this.post('user/addUser', param).then(res => {
          if (res.code === 1) {
            this.globalData.user = param
            uni.setStorageSync('user', this.globalData.user)
            console.log('新增用户成功，通过openid初始化')
            uni.$emit('noGift')
          } else {
            console.log('❌新增用户成功失败', res)
          }
        }).catch(err => {
          getApp().toastAndConsoleSystemError(err)
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

      post(uri, param) {
        let url = this.globalData.baseUrl + uri
        console.log('🔽网络请求Post=>', url)
        console.log('参数=>', JSON.stringify(param))
        let promise = new Promise(function(resolve, reject) {
          uni.request({
            url: url,
            data: param,
            method: 'POST',
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
