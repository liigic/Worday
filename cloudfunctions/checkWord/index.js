// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

exports.main = async (event, context) => {
  const result = await db.collection('t_dictionary').where({
    word: db.RegExp({
      regexp: '\^' + event.check_word,
      options: 'i'
    })
  }).limit(20).get()
  return ({
    data: result
  })
}