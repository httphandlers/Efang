// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
   db.collection('ExpressNo').where({
    Mobile: event.mobile
  })
    .get({
      success(res) {
        console.log(res.data)
      }
    })
  return {
    event,
    no
  }
}