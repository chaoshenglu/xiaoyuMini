# xiaoyuMini
```
<template>
  <view>

  </view>
</template>

<script setup>
import {
  computed,
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

```
<template>
  <view>

  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    onLoad() {

    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>
```