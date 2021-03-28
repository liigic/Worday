// miniprogram/pages/exercise/learn_vocab/learn_vocab.js
const backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  data: {
    data: {},
    page: -1, // 第几个词开始，数据库总4533个单词（所以这个值不能是4533，最大是4532）
    limit: 1,
    top: 1, // 第一个学习单词 / 第一个复习单词 / 第一个学过的单词
    sum: 0, // 今日新词/待复习单词/学过的单词
    last_word: 0,
    study_word: 0,
    day_word: 0,
    day_study_word: 0,
  },
  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      last_word: parseInt(options.last_word),
      study_word: parseInt(options.study_word),
      day_word: parseInt(options.day_word),
      day_study_word: parseInt(options.day_study_word),
    })
    switch (options.type) {
      case 'one':
        that.setData({
          sum: options.study_word,
        })
        console.log(options.study_word)
        break;
      case 'two':
        that.setData({
          // 设置每日的单词 - 今日所学了的单词
          sum: options.day_word - options.day_study_word,
          page: options.study_word - 1
        })
        console.log("two")
        break;
      case 'three':
        that.setData({
          sum: options.last_word,
          top: options.study_word - options.last_word,
        })
        console.log("three")
        break;
    }
    that.next_vocab()
  },

  last_vocab(e) {
    let that = this
    if (that.data.page < that.data.top) {
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

  // 播放读音
  speech_word() {
    let that = this
    backgroundAudioManager.title = '未知名歌手'
    // backgroundAudioManager.titepnamele = '不详'
    backgroundAudioManager.singer = that.data.data.headWord
    backgroundAudioManager.src = 'https://dict.youdao.com/dictvoice?audio=' + that.data.data.content.word.content.ukspeech
  },

  //  next是下一个单词也是开始的第一个单词
  next_vocab(e) {
    console.log(e)
    let that = this
    if (e && e.currentTarget.dataset.flag) {
      console.log('学习成功')
      wx.cloud.callFunction({
        name: 'updateDayWord',
        data: {
          last_word: that.data.last_word + 1
        }
      }).then(res => {
        console.log(res)
        // console.log(that.data.data)
        // console.log(that.data.page)
      })
    }
    let page = that.data.page + 1
    console.log(page)
    that.data.page = page
    if (that.data.sum > page) {
      wx.cloud.callFunction({
        name: 'getWords',
        data: {
          page: that.data.page,
          limit: that.data.limit,
        }
      }).then(res => {
        console.log(res)
        that.setData({
          data: res.result.data.data[0]
        })
        // console.log(that.data.data)
        // console.log(that.data.page)
      })
    } else {
      wx.showToast({
        title: '完成！',
      })
      wx.navigateTo({
        url: 'xxx', // 完成任务后，跳转地址
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  onReady: function () {}
})