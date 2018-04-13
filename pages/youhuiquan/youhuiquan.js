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
    common.netWorkRequest({
      url: 'Xmarketing/listCoupon',
      onSuccess: function (res) {
        console.log(res);
        if (res.data instanceof Array) {
          that.setData({
            menu_b: res.data,
            status: true
          })
        }
      }
    })
  },
  getHbTap: function (e) {
    var yhid = e.currentTarget.dataset.yhid;
    // Xmarketing / lq_Coupon
    common.netWorkRequest({
      url: 'Xmarketing/lq_Coupon',
      params: {
        openid: wx.getStorageSync("openId"),
        id: yhid,
      },
      onSuccess: function (res) {
        if (res.data.code == 1) {
          wx.showModal({
            title: '领取成功',
          })
        } else {
          wx.showModal({
            title: '领取失败',
          })
        }
      }
    })
  },
  onShow: function () {

  },

})