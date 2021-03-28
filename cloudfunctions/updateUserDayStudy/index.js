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
  const user = await t_user.where({
    _openid: wxContext.OPENID,
  }).get()
  await t_user.where({
    _openid: wxContext.OPENID,
  }).update({
    data: {
      last_study_time: event.last_study_time,
      day_study_word: 0,
      last_word: _.inc(parseInt(user.data[0].day_study_word))
    }
  })
}