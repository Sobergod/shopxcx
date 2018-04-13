// pages/youhuiquan/youhuiquan.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu_b: [],
    status: false,

  },
  onLoad: function (options) {
    var that = this;
    // 获取我的优惠券
    common.netWorkRequest({
      url: 'Xmarketing/find_Coupon',
      params:{
        openid:wx.getStorageSync("openId")
      },
      onSuccess: function (res) {
        console.log(res);
        if (res.data instanceof Array) {
          that.setData({
            menu_b: res.data,
            status: true
          })
        } else {
          that.setData({
            menu_b: res.data,
            status: false
          })
        }
      }
    })
  },
  onShow: function () {

  },

})