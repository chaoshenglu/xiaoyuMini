# xiaoyuMini
```
<template>
  <view>

  </view>
</template>

<script setup>

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