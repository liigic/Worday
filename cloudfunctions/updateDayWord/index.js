// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const DB = cloud.database()
const t_user = DB.collection('t_user')
const t_words = DB.collection('t_words')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _ = DB.command

  await t_user.where({
    _openid: wxContext.OPENID,
  }).update({
    data: {
      day_word: event.day_word,
    }
  })
}