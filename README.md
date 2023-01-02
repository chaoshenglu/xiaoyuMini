# xiaoyuMini
```
<template>
  <view>

  </view>
</template>

<script setup>
import {
  computed,//计算型属性在使用的时候，也要加.value
  ref
} from 'vue'

import {
  onLoad
} from "@dcloudio/uni-app"

onLoad((option) => {
    
})

</script>

<style lang="scss">

</style>
```

```
let uri = 'tz_person/updateTZPerson'
let param = {}
getApp().post(uri, param).then(res => {
  console.log('res=', JSON.stringify(res, null, 2))
}).catch(err => {
  getApp().toastAndConsoleSystemError(err)
})
```