// pages/ejfl/ejfl.js
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subGoodsList: [],
    hasList: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var eFid = options.fid;
    this._getSubGoodsList(eFid);
  },
  goToDetail:function(e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../../pages/xiangqing/xiangqing?gid='+gid,
    })
  },
  // 查二级商品
  _getSubGoodsList: function (fid) {
    var that = this;
    common.netWorkRequest({
      url: 'xshop',
      params: {
        f2: fid
      },
      onSuccess: function (res) {
        console.log(res.data);
        if (res.data.length > 0) {
          that.setData({
            subGoodsList: res.data,
          })
        } else {
          that.setData({
            hasList: 0,
          })
        }
      }
    })
  }

})