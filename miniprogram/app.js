var DateUtil = require('./utils/DateUtil.js')
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'wcloud-8g7yq3ydb5aebe1a',
        traceUser: true,
      })
    }
    this.add_user()
  },

  add_user() {
    let that = this
    wx.cloud.callFunction({
      name: 'addUser',
      data: {
        study_word: 0, // 已学习的单词数量
        day_word: 30, // 设置每天的学习单词数量
        last_study_time: DateUtil.formatDate(new Date())
      }
    }).then(res => {
      // if (res.result.data.length > 0)
      // console.log(res)
    })
    that.data_init()
  },

  data_init() {
    let that = this
    wx.cloud.callFunction({
      name: 'getUser'
    }).then(res => {
      // if (res.result.data.length > 0)
      console.log(res)
      const user = res.result.user
      if (user.last_study_time != DateUtil.formatDate(new Date())) {
        wx.cloud.callFunction({
          name: 'updateUserDayStudy',
          data: {
            last_study_time: DateUtil.formatDate(new Date())
          }
        })
        // that.globalData.userInfo = res.result.user
      } else {
        // that.globalData.userInfo = res.result.user
      }
    })
  }
})