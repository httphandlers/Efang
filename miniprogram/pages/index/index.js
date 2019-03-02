//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    console.log(this.data.userInfo)
  },
  onGetExpress: function (mobile) {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'QueryExpressNoByMobile',
      data: { mobile: mobile},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.no.data[0].Mobile ,res.result.no.data[0].ExpressNo)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  commonInput: function (e) {
    console.log(e)
    let data ={}
    data[e.target.id] = e.detail.value
    this.setData(data)
  }, 
  onAddExpress: function () {
    const mobile = this.data.Mobile
    const name = this.data.Name
    const expresssNo = this.data.ExpresssNo
    console.log(this.data)
    // 插入数据库
    const db = wx.cloud.database()
    db.collection('ExpressNo').add({
      data: {
        ExpressNo: expresssNo,
        Mobile: mobile,
        Name: name,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
    })
  }

})
