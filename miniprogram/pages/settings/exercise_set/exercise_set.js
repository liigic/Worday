// miniprogram/pages/settings/exercise_set/exercise_set.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(that.data.userInfo)
  },
  set_day_word(e) {
    let that = this
    console.log(e.detail.key)
    wx.cloud.callFunction({
      name: 'updateDayWord',
      data: {
        day_word: e.detail.key
      }
    }).then(
      app.data_init()
    )
    wx.showToast({
      title: '设置' + e.detail.key + '个单词',
    })
  },
})