// pages/exercise/exercise.js
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
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      that.setData({
        userInfo: app.globalData.userInfo
      })
      wx.hideLoading()
    }, 1000)

    console.log(that.data.userInfo)
    wx.setNavigationBarTitle({
      title: "" //页面标题为路由参数
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  onShow: function () {
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },
  go_study() {
    wx.navigateTo({
      url: './learn_vocab/learn_vocab?word',
    })
  },
  //认单词
  start: function () {
    wx.navigateTo({
      url: 'learn_vocab/learn_vocab',
    })
  },

  //查单词
  search: function () {
    wx.navigateTo({
      url: '../vocabulary/vocabulary',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})