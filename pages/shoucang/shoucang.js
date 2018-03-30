// pages/shoucang/shoucang.js
var common = require("../../utils/common.js");
var setCollection = require("../../utils/setcollection.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    collectionList: [],
    hasCollection: false,
  },
  detailTap:function(e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../../pages/xiangqing/xiangqing?gid='+gid,
    })
  },
  // 取消收藏
  cancelCollectionTab: function (e) {
    var collectionId = e.currentTarget.dataset.gid;
    setCollection.removeCollection(collectionId);
    this.getAllCollection();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAllCollection();
  },
  // 查询所有收藏
  getAllCollection: function () {
    var that = this;
    common.netWorkRequest({
      url: 'Xshopping/collect_sel',
      params: {
        openid: wx.getStorageSync('openId')
      },
      onSuccess: function (res) {
      },
      onComplete: function (res) {
        if (res.data instanceof Array) {
          var collection = [];
          for (let i = 0; i < res.data.length; i++) {
            collection.push(res.data[i][0]);
          }
          that.setData({
            collectionList: collection,
            hasCollection: true
          })
        } else {
          that.setData({
            collectionList: [],
            hasCollection: false
          })
        }
        wx.hideLoading();
      },
    });
  },
})