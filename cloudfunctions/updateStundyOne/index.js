// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wcloud-8g7yq3ydb5aebe1a'
})
const DB = cloud.database()
const t_user = DB.collection('t_user')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = DB.command
  await t_user.where({
    _openid: wxContext.OPENID,
  }).update({
    data: {
      day_study_word: _.inc( event.study_one_word), // 原数据自增
    }
  })
}