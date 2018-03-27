// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    userInfo: wx.getStorageSync('userInfo'),
    // orderItems
    orderItems: [
      { name: '签到', },
      { name: '待付款', },
      { name: '待收货', },
      { name: '待评价', },
      { name: '售后', },
    ],
  },
  addressTab:function() {
    wx.chooseAddress({
      success: function(res) {
        wx.setStorageSync('useThisAddress', res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})