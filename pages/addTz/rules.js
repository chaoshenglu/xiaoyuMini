export const rules = {
  date: {
    rules: [{
      required: true,
      errorMessage: '活动日期不能为空'
    }]
  },
  time: {
    rules: [{
      required: true,
      errorMessage: '活动时间不能为空'
    }]
  },
  stopBaoMingTime: {
    rules: [{
      required: true,
      errorMessage: '飞机时间不能为空'
    }]
  },
  feijiMoney: {
    rules: [{
      required: true,
      errorMessage: '飞机扣费不能为空'
    }, {
      format: 'number',
      errorMessage: '扣费金额只能输入数字'
    }]
  },
  qiuguanId: {
    rules: [{
      required: true,
      errorMessage: '球馆不能为空'
    }]
  },
  selectedFields: {
    rules: [{
      required: true,
      errorMessage: '场地不能为空'
    }]
  },
  limitNumber: {
    rules: [{
      required: true,
      errorMessage: '人数限制不能为空'
    }]
  },
}
