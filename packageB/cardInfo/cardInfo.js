// packageB/cardInfo/cardInfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCtls: [false, false, false, false, false],
    card_id: -1,
    share_link: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let _this = this;
    this.data.showCtls[Number(options.card_id) - 1] = true;
    this.setData({
      showCtls: this.data.showCtls,
      card_id: Number(options.card_id)
    })


    console.log(options);
    // console.log(app.globalData.token);
    wx.request({
      url: 'http://philately.bluej.cn/index/api/share_card_link',
      data: {
        access_token: wx.getStorageSync('token'),
        card_type_id: _this.data.card_id
      },
      success: function (res) {
        console.log(res);
        // resolve(res.data.data.share_link);
        _this.data.share_link = res.data.data.share_link;
      }
    })



  },
  toMyCards: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '../../packageA/myCards/myCards',
    })
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
  onShareAppMessage: function (res) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(this.data.share_link);
    if (res.from === 'button') {
      let obj = {
        title: "请收下我的卡片",
        path: "/packageA/myCards/myCards?share_link=" + this.data.share_link,
        success: function () {
          console.log('ok');
          wx.hideLoading()
          wx.navigateBack()
          
        },
        fail: function () {
          console.log('not ok');
          wx.hideLoading()
          wx.navigateBack()
        }
      }
      console.log(obj);
      wx.hideLoading()
      return obj;
    }


  }
})