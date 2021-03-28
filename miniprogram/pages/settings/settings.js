// const app = getApp();

// const formatDate = dateTime => {
//   const date = new Date(dateTime);
//   return `${date.getFullYear()}-${date.getMonth() +
//     1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
// };

Page({
  //页面的初始数据
  data: {
  },

//  //学习提醒
//   onSubscribe: function (e) {
//     // 获取课程信息
//     const item = e.currentTarget.dataset.item;

//     // 调用微信 API 申请发送订阅消息
//     wx.requestSubscribeMessage({
//       // 传入订阅消息的模板id，模板 id 可在小程序管理后台申请
//       tmplIds: 'e2V_Lsf6AqRJE36bCCMLyhASz74snpwFntbCejDbbgg',
//       success(res) {
//         // 申请订阅成功
//         if (res.errMsg === 'requestSubscribeMessage:ok') {
//           // 这里将订阅的课程信息调用云函数存入db
//           wx.cloud
//             .callFunction({
//               name: 'subscribe',
//               data: {
//                 thing1: '同学，今天的单词任务还没有完成哦！',
//                 thing6: '快来Worday背单词吧！',
//               },
//               templateId: 'e2V_Lsf6AqRJE36bCCMLyhASz74snpwFntbCejDbbgg',
//             })
//             .then(() => {
//               wx.showToast({
//                 title: '订阅成功',
//                 icon: 'success',
//                 duration: 2000,
//               });
//             })
//             .catch(() => {
//               wx.showToast({
//                 title: '订阅失败',
//                 icon: 'success',
//                 duration: 2000,
//               });
//             });
//         }
//       },
//     });

//     if (getCurrentPages().length != 0) {
//       //刷新当前页面的数据
//       getCurrentPages()[getCurrentPages().length - 1].onLoad()
//     }
//   },

  //生命周期函数--监听页面加载
  onLoad: function () {},

  //用户点击右上角分享
  onShareAppMessage: function () {}
})