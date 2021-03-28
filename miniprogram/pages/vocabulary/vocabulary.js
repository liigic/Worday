Page({
  //页面的初始数据
  data: {
    scrollTop: undefined,
    results: null,
  },

  // 页面监听函数
  onPageScroll(res) {
    this.setData({
      scrollTop: res.scrollTop,
    })
  },

  get_word(e) {
    console.log(e)
    let that = this
    let check_word = e.detail.value
    if (check_word != '') {
      wx.cloud.callFunction({
        name: 'checkWord',
        data: {
          check_word: check_word
        }
      }).then(res => {
        // if (res.result.data.length > 0)
        console.log(res)
        let data = res.result.data.data
        if (data.length > 0)
          that.setData({
            results: data
          })
        else
          that.setData({
            results: null
          })
      })
    } else {
      that.setData({
        results: null
      })
    }
  },

  goWord(e) {
    console.log(e)
    wx.navigateTo({
      url: './search_result/search_result?word=' + e.currentTarget.dataset.word + '&translation=' + e.currentTarget.dataset.translation,
    })
  },

  //生命周期函数--监听页面加载
  onLoad: function () {},

  //用户点击右上角分享
  onShareAppMessage: function () {}
})