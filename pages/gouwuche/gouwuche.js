// pages/gouwuche/gouuche.js
var shoppingCart = require('../../pages/gouwuche/shoppingCart.js');
Page({
  data: {
    menu: [
      { picUrl: "../../images/one.jpg" }
    ],
    goodsItem: wx.getStorageSync('cart'),
    isOption: true,
    cartHasGoods:false
  },
  // 获取购物车内商品数量
  _cartGoodsCount:function() {
    var goods = wx.getStorageSync('cart');
    if(goods) {
      this.setData({
        cartHasGoods:true
      })
    } else {
      this.setData({
        cartHasGoods:false
      })
    }
  },
  // 刷新购物车数据
  _resetCartData:function() {
    this.setData({
      goodsItem:wx.getStorageSync('cart'),
    })
  },
  // 数量加
  addCountTab:function (e) {
    shoppingCart.addCount(e.currentTarget.dataset.gid);
    this._resetCartData();
  },
  // 数量减
  minCountTab:function (e) {
    shoppingCart.minuCount(e.currentTarget.dataset.gid);
    this._resetCartData();
  },
  // 设置按钮
  optionsTap: function () {
    if (this.data.isOption) {
      this.setData({
        isOption: false,
      })
    } else {
      this.setData({
        isOption: true,
      })
    }
  },
  // onLoad方法
  onLoad:function() {
    this._cartGoodsCount();
  }, 

  // onShow方法
  onShow:function() {
    this._resetCartData();
  }
})
