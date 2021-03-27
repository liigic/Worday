// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'wcloud-8g7yq3ydb5aebe1a'
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
      day_study_word: event.day_study_word,
      day_word: event.day_word,
      study_word: event.study_word,
      last_word: event.last_word,
    }
  })
}