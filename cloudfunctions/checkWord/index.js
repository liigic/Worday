// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wcloud-8g7yq3ydb5aebe1a'
})
const db = cloud.database()

exports.main = async (event, context) => {
  let inputValue = event.check_word;
  const result = await db.collection('t_dictionary').where({
    word: db.RegExp({
      regexp: "\^" + inputValue,
      // regexp: event.check_word,
      options: 'i'
    })
  }).limit(20).get()
  return ({
    data: result
  })
}