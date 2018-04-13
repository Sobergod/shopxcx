// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    title:'',
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
  addressTap:function() {
    wx.chooseAddress({
      success: function(res) {
        wx.setStorageSync('useThisAddress', res)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  listClick: function (event) {
    var that=this;
    console.log(event);
    var index = event.currentTarget.dataset.ld
    wx.navigateTo({ url: '../qbdd/qbdd?ld=' + index })
  } 

})