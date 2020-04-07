// packageA/myCards/myCards.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedList: [],
    selectedShows: [false, false, false],
    resultShow: false,
    resultText: '',
    draw_id:'',
    data: null,
    is_two:false
  },
  compose: function () {
    wx.showLoading({
      title: '加载中',
    })
    if (this.data.selectedList.length == 2) {
      let _this = this;
      wx.request({
        url: 'http://philately.bluej.cn/index/api/draw',
        data: {
          access_token: wx.getStorageSync('token'),
          card_type_id1: this.data.selectedList[0],
          card_type_id2: this.data.selectedList[1]
        },
        success: function (res) {
          console.log(res);
          if(res.data.data.prize_id!=12){
            _this.setData({
              resultShow: true,
              resultText: res.data.data.prize_name,
              draw_id:res.data.data.draw_id
            })
          }else{
            wx.showModal({
              cancelColor: 'cancelColor',
              title:res.data.data.prize_name,
              icon:"none"
            })
          }
          _this.getCards();
          wx.hideLoading()

        }
      })
    }else{
      wx.showToast({
        title: '请选择两张卡片',
        icon:'none'
      })
    }


  },
  getCards:function(){
    let _this=this;
    wx.request({
      url: 'http://philately.bluej.cn/index/api/personal_center',
      data: {
        access_token: wx.getStorageSync('token')
      },
      success: function (res) {
        //成功获取个人卡片
        let count=0;
        console.log(res.data.data);
        res.data.data.user_card_list.forEach(item => {
          item.is_selected = false;
          if(item.card_num>0){
            count++
          }
          
        })

        _this.setData({
          data: res.data.data,
          is_two:count>=2?true:false
        })

      }
    })
  },
  cardTab: function (e) {
    console.log(e.currentTarget.dataset.index);

    if (this.data.selectedList.includes(e.currentTarget.dataset.index)) {
      let pos = this.data.selectedList.indexOf(e.currentTarget.dataset.index);
      this.data.selectedList.splice(pos, 1);
    } else if (e.currentTarget.dataset.num > 0) {
      this.data.selectedList.unshift(e.currentTarget.dataset.index)
    } else {
      wx.showToast({
        title: '并未持有',
        icon: 'none'
      })
    }
    if (this.data.selectedList.length > 2) {
      this.data.selectedList.length = 2;
    }

    console.log(this.data.data);
    this.data.data.user_card_list.forEach(item => {
      let is_this_selected = false;
      this.data.selectedList.forEach(item2 => {
        if (item.card_type_id == item2) {
          is_this_selected = true;
        }
      })
      item.is_selected = is_this_selected;
    })


    this.setData({
      selectedList: this.data.selectedList,
      data: this.data.data
    })


  },
  toFill: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '../../packageB/fill/fill?draw_id='+this.data.draw_id+'&'+'prize_name='+this.data.resultText,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    wx.login({
      success(res) {
        console.log(res);

        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://philately.bluej.cn/index/login/login',
            data: {
              code: res.code,
              app_key: "wx2c7a5e5b2550c571",
              app_secret: "f5b3df65e8e5158efd1a619c14128c43"
            },
            success: function (res) {
              //成功登录
              wx.setStorageSync('token', res.data.data.access_token);

              _this.getCards();
              console.log(options);
              if(options.share_link){
                wx.request({
                  url: options.share_link,
                  data:{
                    access_token: wx.getStorageSync('token')
                  },
                  success:function(res){
                    console.log(res);
                    wx.showModal({
                      cancelColor: 'cancelColor',
                      title:res.data.msg,
                      icon:"none"
                    })
                    
                  }
                })
              }
              
              
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.hideLoading()
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