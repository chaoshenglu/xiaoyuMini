<template>
  <view class="lxCenterColumn" style="margin-top: 24px;">
    <view class="lxColumn infoCard">
      <view class="infoRow lxCenterRow">
        <text class="lx666">活动日期</text> <text class="lx333">{{ tz.date }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动时间</text> <text class="lx333">{{ tz.time }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动地点</text> <text class="lx333">{{ tz.qiuguanName || '投票中' }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动场地</text> <text class="lx333">{{ tz.fields || '待定' }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">活动状态</text> <text class="lx333">{{ statusStr }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">发起人</text> <text class="lx333">{{ tz.createdPersonName }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">发起组织</text> <text class="lx333">{{ tz.clubName || '-' }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">发起时间</text> <text class="lx333">{{ tz.createTime }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">人数限制</text> <text class="lx333">{{ tz.limitNumber }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">已报名人数</text> <text class="lx333">{{ tz.personNumber }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">飞机时间</text> <text class="lx333">{{ tz.stopBaoMingTime }}</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666">飞机扣费</text> <text class="lx333">{{ tz.feijiMoney }}元</text>
      </view>

      <view class="infoRow lxCenterRow">
        <!-- lxtodo -->
        <text class="lx666">费用说明</text> <text class="lx333">女生0.7x，男生1x</text>
      </view>

      <view class="infoRow lxCenterRow">
        <text class="lx666" style="flex-shrink:0;">备注</text>
        <text class="lx333"
          style="margin-left: 28px;font-size: 14px;">{{tz.remark || '请各位球友根据自身的身体情况控制运动强度，避免出现意外，如在运动中碰伤或突发疾病，组织者不承担任何法律责任。'}}</text>
      </view>

    </view>
    <div class="tip" v-if="tz.remark">请各位球友根据自身的身体情况控制运动强度，避免出现意外，如在运动中碰伤或突发疾病，组织者不承担任何法律责任。</div>

    <view style="width: 100px;height: 100px;"></view>

    <view v-if="tz.status === 0 || tz.status === 1">
      <HalfBottomBtn title='修改帖子' :isLeft="true" @tapBottomBtn="editTieZi()" />
      <HalfBottomBtn title='停止报名' :isLeft="false" @tapBottomBtn="stopForWhat()" />
    </view>
    <view v-if="tz.status === 3">
      <HalfBottomBtn title='修改帖子' :isLeft="true" @tapBottomBtn="editTieZi()" />
      <HalfBottomBtn title='允许报名' :isLeft="false" @tapBottomBtn="allowBaoMing()" />
    </view>
    <view v-if="tz.status === 2">
      <LXBottomBtn title="恢复此活动" @tapBottomBtn="resumeActivity()" />
    </view>

  </view>
</template>

<script setup>
  import {
    computed,
    ref
  } from 'vue'
  const props = defineProps(['tiezi'])
  const tz = computed(() => {
    return props.tiezi
  })
  const statusStr = computed(() => {
    //0未开放 1报名中 2活动已取消 3已截止报名 4活动已结束
    if (tz.value.status == 0) {
      return '未开放'
    } else if (tz.value.status == 1) {
      return '报名中'
    } else if (tz.value.status == 2) {
      return '活动已取消'
    } else if (tz.value.status == 3) {
      return '已截止报名'
    } else {
      return '活动已结束'
    }
  })

  function editTieZi() {
    let str = JSON.stringify(tz.value)
    uni.navigateTo({
      url: '/pages/addTz/addTz?tiezi=' + str
    })
  }

  function stopForWhat() {
    uni.showActionSheet({
      itemList: ['仅停止报名', '停止报名并取消活动'],
      success: function(res) {
        if (res.tapIndex === 0) {
          console.log('仅停止报名')
        } else {
          console.log('停止报名并取消活动')
        }
      }
    })
  }

  function resumeActivity() {

  }

  function allowBaoMing() {

  }

  function cancelActivity() {

  }
</script>

<style lang="scss">
  .tip {
    font-size: 13px;
    color: #666666;
    margin-left: 4vw;
    margin-right: 4vw;
    margin-top: 10px;
  }

  .infoRow {
    justify-content: space-between;
    min-height: 70rpx;
  }

  .infoCard {
    background-color: white;
    width: 88vw;
    border-radius: 10px;
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 8px;
    padding-bottom: 8px;
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.02);
    font-size: 15px;
  }
</style>
