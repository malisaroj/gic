// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  
  if (event.id)
    return await db.collection("posts").where({
      _id: event.id
    }).get();

  else if (event.categoryTitle) {
    return await db.collection("posts").orderBy('createdDate', 'desc').where({
      category: event.categoryTitle
    }).get();

  }
  else
    return await db.collection("posts").orderBy('createdDate', 'desc').where({}).get();
}