// pages/shoucang/shoucang.js
var common = require("../../utils/common.js");
var setCollection = require("../../utils/setcollection.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

    collectionList: [
      {photo: ['../../images/two.jpg'], name: ["玻尿酸晚安睡眠面膜aaaaaa"], money: ["￥99"], shoucang: "取消收藏"},
      { photo: ['../../images/one_02.jpg'], name: ["玻尿酸晚安睡眠面膜"], money: ["￥99"], shoucang: "取消收藏" },
      { photo: ['../../images/one_02.jpg'], name: ["玻尿酸晚安睡眠面膜"], money: ["￥99"], shoucang: "取消收藏" },
      { photo: ['../../images/one_02.jpg'], name: ["玻尿酸晚安睡眠面膜"], money: ["￥99"], shoucang: "取消收藏" }
    ],
    hasCollection: false,
  },
  // 取消收藏
  cancelCollectionTab:function(e) {
    var collectionId = e.currentTarget.dataset.gid;
    setCollection.removeCollection(collectionId);
    this._selectAllCollection();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._selectAllCollection();
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})