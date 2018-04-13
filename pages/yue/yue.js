// pages/yue/yue.js
var common = require("../../utils/common.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yue: "0.00",
    rechargeMoney: ''
  },

  reCharge: function () {
    let that = this;
    common.netWorkRequest({
      url: 'pay2.php',
      params: {
        openid: wx.getStorageSync('openId'),
        sum: that.data.rechargeMoney
      },
      onSuccess: function (res) {
        console.log(res);
        wx.requestPayment({
          // Xindent/balance
          'timeStamp': res.data.timeStamp.toString(),
          'nonceStr': res.data.nonce_str,
          'package': "prepay_id=" + res.data.prepay_id,
          'signType': "MD5",
          'paySign': res.data.paySign,
          success: function (res) {
            console.log(res);
            common.netWorkRequest({
              url: 'Xindent/balance',
              params: {
                openid: wx.getStorageSync('openId'),
                sum: that.data.rechargeMoney
              },
              onSuccess: function (res) { },
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      onComplete: function (res) {
      },
    });
  },

  moneyInput: function (e) {
    this.setData({
      rechargeMoney: e.detail.value
    })
    // console.log(this.data.rechargeMoney);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // Xindent / listye
    let that = this;
    common.netWorkRequest({
      url: 'Xindent/listye',
      params: {
        openid: wx.getStorageSync('openId'),
      },
      onSuccess: function (res) {
        that.setData({
          yue: res.data.money
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
})