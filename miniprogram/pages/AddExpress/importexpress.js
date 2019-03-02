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

  onLoad: function () {
    let thisp=this
    // 调用云函数
    wx.cloud.callFunction({
      name: 'DecryptData',
      success: res => {
        console.log('DecryptData: ', res.result)
        //判断是否是小宁
        let whiteList = ["orOBZ5BoYPJLPl2t5uTu1spW_E2U", "orOBZ5NHp-I_TPCNQY6JJE_vHY88","orOBZ5PQ3aUdbUmEZ-Tle_EMf-hE"];
        if (whiteList.indexOf(res.result.openid)<0)
        {
          wx.showToast({
            title: '没有权限',
            icon: 'none',
            duration: 2000
          })
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: err => {
        console.error('DecryptData', err)
        wx.navigateTo({
          url: '/pages/index/index',
        })
      }
    })
  },
  onGetExpress: function (mobile) {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'QueryExpressNoByMobile',
      data: { mobile: mobile },
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.no.data[0].Mobile, res.result.no.data[0].ExpressNo)
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
    let data = {}
    data[e.target.id] = e.detail.value
    this.setData(data)
  },
  onAddExpress: function () {
   let data=this;
    if (!this.data.Mobile || !this.data.Name || !this.data.ExpressNo)
    {
      wx.showToast({
        title: '数据不完整',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    const mobile = this.data.Mobile
    const name = this.data.Name
    const expressNo = this.data.ExpressNo
    // 插入数据库
    const db = wx.cloud.database()
    db.collection('ExpressNo').add({
      data: {
        ExpressNo: expressNo,
        Mobile: mobile,
        Name: name,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        

      },
      fail: function()
      {
        wx.showToast({
          title: '添加失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

})
