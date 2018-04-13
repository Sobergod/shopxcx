// pages/xiangqing/xiangqing.js
var shoppingCart = require("../../pages/gouwuche/shoppingCart.js");
var common = require("../../utils/common.js");
var collection = require("../../utils/setcollection.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/two.jpg',
      '../../images/two.jpg',
    ],
    menu: [
      { photo: "../../images/two.jpg" },
      { photo: "../../images/two.jpg" },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    goodsItem: {},
    allCollection: [],
    status: true,
    counts: 1,
  },
  onLoad: function (options) {
    var gid = options.gid;
    this._getGoodsItem(gid);
  },
  onShow() {
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
        var status =
          that.checkGoodsIsCollect(
            that.data.goodsItem.shopid,
            res.data
          );
        that.setData({
          status: !status,
        })
      },
      onComplete: function (res) {
      },
    });
  },
  // 判断当前商品是否被收藏
  checkGoodsIsCollect: function (gid, collection) {
    if (collection) {
      for (let i = 0; i < collection.length; i++) {
        if (gid == collection[i][0].shopid) {
          return true;
        }
      }
    }
  },
  // 添加和删除收藏
  changeCollectionTap: function (e) {
    var gid = e.currentTarget.dataset.gid,
      status = e.currentTarget.dataset.status;
    if (this.data.status) {
      collection.addCollection(gid);
      this.setData({
        status: false,
      });
    } else {
      collection.removeCollection(gid);
      console.log(1);
      this.setData({
        status: true,
      });
    }
  },
  //跳转评价界面
  evaluateTap: function (e) {
    var gid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../pages/pingjia/pingjia?gid=' + gid,
    })
  },
  // 跳转购物车页面 
  gotoCart: function () {
    wx.switchTab({
      url: '../../pages/gouwuche/gouwuche',
    })
  },

  // 查询单个商品
  _getGoodsItem: function (gid) {
    var goodsNum,
      that = this;
    common.netWorkRequest({
      url: "xshop",
      params: {
        shopid: gid,
      },
      onSuccess: function (res) {
        var photomore = [],
          shopphotos = [],
          goodsItem = res.data[0];
        goodsItem.shopPhotos = res.data[0].shopphotos.split(',');
        goodsItem.photoMore = res.data[0].photomore.split(',');
        that.setData({
          goodsItem: goodsItem
        })
      },
    })
  },
  // 添加购物车
  addInCartTap: function () {
    common.st_success("添加购物车成功");
    let goodsItem = {
      id: this.data.goodsItem.shopid,
      name: this.data.goodsItem.shopname,
      price: this.data.goodsItem.shopmoney,
      brief: this.data.goodsItem.shopinfo,
      picture: this.data.goodsItem.shopphoto
    }
    let counts = this.data.counts
    shoppingCart.addCart(goodsItem, counts);
  },
  // 单条商品购买
  readyToPayTap: function (e) {
    console.log(e);
    var img = e.currentTarget.dataset.img,
      id = e.currentTarget.dataset.id,
      name = e.currentTarget.dataset.name,
      price = e.currentTarget.dataset.price,
      count = e.currentTarget.dataset.count;
    wx.navigateTo({
      url: '../../pages/gmxx/gmxx?img=' + img + '&id=' + id + '&name=' + name + '&price=' + price + '&count=' + count + '&from=detail',
    });
  },
})