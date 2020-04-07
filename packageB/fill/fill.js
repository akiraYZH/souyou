// packageB/fill/fill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    draw_id:'',
    prize_name:'',
    is_correct_phone:true
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  checkPhone:function(e){
    console.log(e.detail.value);
    this.data.is_correct_phone=/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(e.detail.value);
    if(!this.data.is_correct_phone){
      wx.showToast({
        title: '手机格式不正确',
        icon:'none'
      })
    }

  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    e.detail.value.access_token=wx.getStorageSync('token');
    e.detail.value.draw_id=this.data.draw_id;
    wx.request({
      url: 'http://philately.bluej.cn/index/api/update_draw_info',
      data:e.detail.value,
      success:function(res){
        console.log(res);
        wx.showToast({
          title: '成功修改',
          icon:'none'
        }),
        setTimeout(function(){
          wx.navigateTo({
            url: '../../pages/index/index.js',
          })
        },2000)
      }
    })
  },
  submit:function(){
    wx.request({
      url: 'http://philately.bluej.cn/index/api/update_draw_info',
      data:{
        access_token:wx.getStorageSync('token'),
        draw_id:this.data.draw_id,

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      draw_id:options.draw_id,
      prize_name:options.prize_name
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
  onShareAppMessage: function () {

  }
})