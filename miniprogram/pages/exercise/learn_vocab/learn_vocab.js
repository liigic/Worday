// miniprogram/pages/exercise/learn_vocab/learn_vocab.js

Page({

  data: {

  },
  onLoad: function (options) {

  },

  vocab_index: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  dont_konw(e) {
    console.log(e)
  },

  show_data(e) {
    console.log(e)
  },

  next_vocab(e) {
    console.log(e)
    wx.cloud.callFunction({
      name: 'getWords',
      data: {
        page: 1
      }
    }).then(res => {
      // if (res.result.data.length > 0)
      console.log(res)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})