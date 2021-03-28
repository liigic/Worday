Page({
  //页面的初始数据
  data: {
    word: '',
    translation: '',
  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    let that = this
    console.log(options.word)
    that.setData({
      word: options.word,
      translation: options.translation
    })
  },

  backHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  //用户点击右上角分享
  onShareAppMessage: function () {}
})