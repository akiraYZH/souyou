// pages/scan/scan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  takePhoto() {
    let _this=this;
    const ctx = wx.createCameraContext()
    console.log(app.globalData.token);
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        console.log(res);
        
        wx.uploadFile({
          url: 'http://philately.bluej.cn/index/business/scan',
          filePath: tempFilePaths[0],
          sourceType: ['album', 'camera'],
          name: 'photo',
          formData: {
            access_token: wx.getStorageSync('token')
          },
          success(res) {
            const data = JSON.parse(res.data)
            console.log(data);
            wx.navigateTo({
              url: '../../packageB/cardInfo/cardInfo?card_id='+data.data.card_id,
            })
            //do something
          }
        })
      }
    })
  },
  toMyCards:function(){
    wx.navigateTo({
      url: '../../packageA/myCards/myCards',
    })
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

  }
})