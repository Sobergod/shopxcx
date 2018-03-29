// pages/fenlei/fenlei.js
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: wx.getStorageSync("fl2"),
  },

  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var that = this;
    // 二级分类和商品
    var a = wx.getStorageSync('fl2');
  },
  goToSubListTab: function (e) {
    var eFid = e.currentTarget.dataset.efid;
    wx.navigateTo({
      url: '../../pages/ejfl/ejfl?fid=' + eFid,
    })
  }, 
})