// pages/settings/settings.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  
  },
 //学习提醒
  subscribe: function (e) {
    wx.requestSubscribeMessage({
      tmplIds: ['rAL1dIT5XEigQKmW14Ulxw24couywZ6su6jNUhdVNn4'],
      success(res) {
        console.log(res)
        if (res.errMsg == "requestSubscribeMessage:ok") {
          console.log(app.globalData.openid)
          const db = wx.cloud.database()
          db.collection('subscribeMessages').where({
            touser: app.globalData.openid,
            done: false
          }).get({
            success: function (res) {
              console.log(res)

              if (res.data.length != 0) {
                wx.showToast({
                  title: '您已设置过',
                  icon: 'none',
                  duration: 1500
                })
              }

              if (res.data.length == 0) {
                wx.cloud.callFunction({
                  touser: app.globalData.openid,
                  name: "subscribe",
                  data: {},
                  success: function (res) {
                    console.log(res.result)
                    wx.showToast({
                      title: '设置成功',
                      icon: 'success',
                      duration: 1500
                    })
                  },
                  fail: console.error
                })
              }
            }
          });
        } else {
          wx.showToast({
            title: '设置失败',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
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