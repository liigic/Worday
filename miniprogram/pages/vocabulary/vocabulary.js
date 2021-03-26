// pages/vocabulary/vocabulary.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: undefined,
    results: null,
  },
  onTapWord(e) {

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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