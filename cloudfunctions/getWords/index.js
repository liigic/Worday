// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wcloud-8g7yq3ydb5aebe1a'
})

const db = cloud.database()
exports.main = async (event, context) => {
  const countResult = await db.collection('t_words').count()
  const total = countResult.total
  const promise = await db.collection('t_words').skip(event.page * event.limit).limit(event.limit).get()
  // 等待所有
  return ({
    data: promise,
    total: total
  })
}