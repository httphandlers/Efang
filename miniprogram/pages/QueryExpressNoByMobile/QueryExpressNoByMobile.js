// miniprogram/pages/QueryExpressNoByMobile/QueryExpressNoByMobile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  commonInput: function (e) {
    let data = {}
    data[e.target.id] = e.detail.value
    this.setData(data)
  }, 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onQuery:function ()
  {
    let data = this;
    if (!this.data.Mobile || this.data.Mobile.length<1)
    { 
      data.setData({ ExpressNo: "请输入手机号" });
      return;
      }
 
    const db = wx.cloud.database()
    db.collection('ExpressNo').where({
      Mobile: this.data.Mobile
    }).get({
      success(res) {
        console.log(res);
        if (res.data.length>0)
        {
          data.setData({ ExpressNo: res.data[res.data.length-1].ExpressNo });
        }
        else{
          data.setData({ ExpressNo: "暂无订单"});
        }
        
      }
    })
  }


})