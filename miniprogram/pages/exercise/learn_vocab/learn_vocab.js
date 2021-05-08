const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({
  data: {
    data: {}, // 单词数据
    page: 0, // 第几个词开始，数据库总4533个单词（所以这个值不能是4533，最大是4532）
    limit: 1,
    sum: 0,
    top: 0,
    // top: 1, // 第一个学习单词 / 第一个复习单词 / 第一个学过的单词
    // sum: 0, // 今日新词/待复习单词/学过的单词
    // last_word: 0,
    // study_word: 0,
    // day_word: 0,
    // day_study_word: 0,
    type: '', //判断是  已复习是one、新词是two、待复习是three
    userInfo: {},
    last_sum: 0,
    next_sum: 0,
  },

  onLoad: function (options) {
    console.log(options)
    let that = this
    that.setData({
      type: options.type
    })
    that.init_word(options.type)
    // that.setData({
    //   last_word: parseInt(options.last_word),
    //   study_word: parseInt(options.study_word),
    //   day_word: parseInt(options.day_word),
    //   day_study_word: parseInt(options.day_study_word),
    //   type: options.type,
    // })
    // switch (options.type) {
    //   case 'one':
    //     that.setData({
    //       sum: options.study_word,
    //     })
    //     // console.log(options.study_word)
    //     break;
    //   case 'two':
    //     that.setData({
    //       // 设置每日的单词 - 今日所学了的单词
    //       top: parseInt(options.study_word) + parseInt(options.last_word) + parseInt(options.day_word),
    //       sum: parseInt(options.day_word) - parseInt(options.day_study_word),
    //       page: parseInt(options.study_word) - 1 + parseInt(options.day_study_word) + parseInt(options.last_word)
    //     })
    //     // console.log("two")
    //     break;
    //   case 'three':
    //     that.setData({
    //       page: parseInt(options.study_word) - 1,
    //       sum: parseInt(options.study_word) + parseInt(options.last_word),
    //       top: parseInt(options.study_word) + 1,
    //     })
    //     // console.log("three")
    //     break;
    // }
    // that.next_vocab()
  },

  last_word() {
    let that = this
    console.log("page", that.data.page, "top", that.data.top)
    if (that.data.page <= that.data.top) {
      wx.showToast({
        title: '已经是第一个了！',
      })
      return
    }
    that.setData({
      page: that.data.page - 1,
      last_sum: that.data.last_sum + 1,
      next_sum: that.data.next_sum - 1
    })
    that.get_word()
  },

  next_word() {
    let that = this
    if (that.data.last_sum <= 0) {
      console.log("page", that.data.page, "top", that.data.top)
      if (that.data.page > that.data.sum) {
        wx.showToast({
          title: '后面没有了哦！',
        })
        return
      }
      if (that.data.userInfo.day_study_word + that.data.next_sum == that.data.userInfo.day_word) {
        wx.showToast({
          title: '学完啦！',
        })
        return;
      }
      switch (that.data.type) {
        case 'one': // 学过的单词不做操作
          break;
        case 'two':
          console.log('学习成功')
          wx.cloud.callFunction({
            name: 'updateStundyOne',
            data: {
              study_one_word: 1
            }
          }).then(res => {
            // console.log(res)
            // console.log(that.data.data)
            // console.log(that.data.page)
          })
          break;
        case 'three':
          console.log('学习成功')
          wx.cloud.callFunction({
            name: 'updateReviewWord'
          }).then(res => {
            // console.log(res)
            // console.log(that.data.data)
            // console.log(that.data.page)
          })
          break;
      }
    } else {
      that.setData({
        last_sum: that.data.last_sum - 1
      })
    }
    that.setData({
      next_sum: that.data.next_sum + 1
    })
    if (that.data.page == that.data.sum) {
      wx.showToast({
        title: '学完啦！',
      })
      return;
    }
    that.setData({
      page: that.data.page + 1
    })
    that.get_word()
  },

  get_word() {
    let that = this
    if (that.data.sum == 0) {
      wx.showToast({
        title: '要先学习单词',
      })
      return
    }

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
    })
  },

  init_word(type) {
    let that = this
    setTimeout(function () {
      wx.cloud.callFunction({
        name: 'getUser'
      }).then(res => {
        switch (type) {
          case 'one':
            that.setData({
              sum: res.result.user.study_word,
            })
            break;
          case 'two':
            let top = res.result.user.day_study_word + res.result.user.last_word + res.result.user.study_word
            let sum = res.result.user.day_word + res.result.user.last_word + res.result.user.study_word - 1
            console.log('top', top)
            console.log('sum', sum)
            that.setData({
              sum: sum,
              page: top,
              top: top,
            })
            break;
          case 'three':
            let top2 = res.result.user.study_word
            that.setData({
              sum: res.result.user.last_word + top2 - 1,
              page: top2,
              top: top2,
            })
            break;
        }
        that.setData({
          userInfo: res.result.user
        })
        that.get_word()
        console.log(res)
      })
      wx.showLoading({
        title: '加载中',
      })
      wx.hideLoading()
    }, 1000)
  },

  backHome: function () {
    wx.switchTab({
      url: '../exercise',
    })
  },

  // 播放读音
  speech_word() {
    let that = this
    backgroundAudioManager.title = that.data.data.headWord + '\/' + that.data.data.content.word.content.usphone + '\/'
    backgroundAudioManager.src = 'https://dict.youdao.com/dictvoice?audio=' + that.data.data.content.word.content.usspeech
  },

  //用户点击右上角分享
  onShareAppMessage: function () {}
})