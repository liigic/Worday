// miniprogram/pages/settings/exercise_set/exercise_set.js
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
    that.data_init()
  },
  data_init(){
    let that = this
    setTimeout(function () {
      wx.cloud.callFunction({
        name: 'getUser'
      }).then(res => {
        that.setData({
          userInfo: res.result.user
        })
        console.log(res)
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.hideLoading()
    }, 1000)
  },
  set_day_word(e) {
    let that = this
    console.log(e.detail.key)
    wx.cloud.callFunction({
      name: 'updateDayWord',
      data: {
        day_word: parseInt(e.detail.key)
      }
    }).then(
      that.data_init()
    )
    wx.showToast({
      title: '设置' + e.detail.key + '个单词',
    })
  },
})