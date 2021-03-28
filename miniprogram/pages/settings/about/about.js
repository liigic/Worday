Page({
  //页面的初始数据
  data: {
    wxid:'Ohh-7ee',
    email:'sevencifer@7ucifer.cn'
  },

  copyWxID: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  copyEmail: function (e) {
    console.log(e)
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  },

  settings: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //生命周期函数--监听页面加载
  onLoad: function () {},

  //用户点击右上角分享
  onShareAppMessage: function () {}
})