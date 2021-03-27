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
  const count = await t_words.count()
  const record = await t_user.where({
    _openid: wxContext.OPENID
  }).count()
  const total = await record.total
  if (total == 0) {
    await t_user.add({
      data: {
        _openid: wxContext.OPENID,  
        study_word: event.study_word,  // 已经学了的单词（有印象的单词）
        day_word: event.day_word, // 设置日常的单词
        day_study_word: 0, // 当天所学的单词
        need_word: count.total, // 需要所有学习的单词
        last_word: 0, //之前所学的单词
      }
    })
  }
}