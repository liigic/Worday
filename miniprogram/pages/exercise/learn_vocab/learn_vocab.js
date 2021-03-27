// miniprogram/pages/exercise/learn_vocab/learn_vocab.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({

  data: {
    data: {},
    page: -1,
    limit: 1,
  },
  onLoad: function (options) {
    let that = this
    that.next_vocab()
  },
  vocab_index: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  last_vocab(e) {
    let that = this
    if (that.data.page < 1) {
      wx.showToast({
        title: '已经是第一个了！',
      })
      return;
    } else {
      that.data.page = that.data.page - 1
      wx.cloud.callFunction({
        name: 'getWords',
        data: {
          page: that.data.page,
          limit: that.data.limit,
        }
      }).then(res => {
        // console.log(res)
        that.setData({
          data: res.result.data.data[0]
        })
        // console.log(that.data.data)
        // console.log(that.data.page)
      })
    }
  },
  speech_word() {
    let that = this
    backgroundAudioManager.title =  '未知名歌手'
    // backgroundAudioManager.titepnamele = '不详'
    backgroundAudioManager.singer =that.data.data.headWord
    backgroundAudioManager.src = 'https://dict.youdao.com/dictvoice?audio=' + that.data.data.content.word.content.usspeech
    // backgroundAudioManager.src = 'https://dict.youdao.com/dictvoice?audio=' + that.data.data.content.word.content.ukspeech
  },
  next_vocab(e) {
    let that = this
    that.data.page = that.data.page + 1
    wx.cloud.callFunction({
      name: 'getWords',
      data: {
        page: that.data.page,
        limit: that.data.limit,
      }
    }).then(res => {
      // console.log(res)
      that.setData({
        data: res.result.data.data[0]
      })
      // console.log(that.data.data)
      // console.log(that.data.page)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  onReady: function () {}
})