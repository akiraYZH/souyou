//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  toScan: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '../scan/scan'
    })
  },
  toMyCards:function(){
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '../../packageA/myCards/myCards'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
