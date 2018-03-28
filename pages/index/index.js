var common = require("../../utils/common.js");
var getUserInfo = require("../../utils/getuserinfo.js")
Page({
  data: {
    imgUrls: [
      '../../images/one.jpg',
      '../../images/one_02.jpg',
    ],
    imageUrl: ['../../images/one.jpg'],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    fenlei1: [
      { name: "护肤" },
      { name: "滋润" },
      { name: "美妆" },
      { name: "调理" },
      { name: "个护" },
    ],
    menu: [],
    menu_a: [
      { picUrl: "../../images/jxhd_01.jpg" },
      { picUrl: "../../images/jxhd_02.jpg" },
    ],
    goodsList: [],
    fenlei: [],
    isLoading: 0,
    num: 3,
    allNum: 0,
  },
  onLoad: function () {
    // 所有分类
    getUserInfo.getUserInfo();
    this._getAllClassifications();
    this._getGoodsList(this.data.num);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var num = this.data.num
    wx.showLoading({
      title: '加载中...',
    });
    num += 3;
    this._getGoodsList(num);
    this.setData({
      isLoading: 1,
      num:num,
    })
  },
  collectionTab:function() {
    wx.navigateTo({
      url: '../../pages/shoucang/shoucang',
    })
  },
  // 获得所有商品
  _getGoodsList: function (num) {
    var goodsNum,
      that = this;
    goodsNum = num ? num : '';
    common.netWorkRequest({
      url: "xshop",
      params: {
        num: goodsNum,
      },
      method: "POST",
      onSuccess: function (res) {
        that.setData({
          goodsList: res.data[0],
          allNum: res.data[1]
        })
      },
      onComplete: function () {
        wx.hideLoading();
        if (that.data.num >= that.data.allNum) {
          that.setData({
            isLoading: 2,
          })
        } else {
          that.setData({
            isLoading: 0,
          })
        }
      }
    })
  },
  // 所有分类
  _getAllClassifications: function () {
    var that = this;
    common.netWorkRequest({
      url: "xfenlei",
      method: "POST",
      onSuccess: function (res) {
        var b = [];
        for (var i in res.data) {
          for (var j = 0; j < res.data[i].er.length; j++) {
            b.push(res.data[i].er[j]);
          }
        }
        wx.setStorageSync("fl2", b);
        that.setData({
          fenlei: res.data,
          menu: b.slice(0, 10)
        })
      }
    });
  },
})
