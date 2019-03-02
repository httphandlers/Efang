// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("event",event)
  const db = cloud.database()
  db.collection('ExpressNo').add({
    data: {
      ExpressNo: event.ExpressNo,
      Mobile: event.Mobile,
      Name: event.Name,
    },
    success(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },
    fail: console.error
  })
  return {
  }
}