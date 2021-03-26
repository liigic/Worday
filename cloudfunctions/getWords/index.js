// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'wcloud-8g7yq3ydb5aebe1a'
})

const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  const countResult = await db.collection('t_dictionary').count()
  const total = countResult.total
  const promise = await db.collection('t_dictionary').skip(event.page * MAX_LIMIT).limit(MAX_LIMIT).get()
  // 等待所有
  return ({
    data: promise,
    total: total
  })
}