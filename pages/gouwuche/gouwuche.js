// pages/gouwuche/gouuche.js
var shoppingCart = require('../../pages/gouwuche/shoppingCart.js');
Page({
  data: {
    menu: [
      { picUrl: "../../images/nogoods.png" }
    ],
    goodsItem: [],
    isOption: true,
    cartHasGoods: false,
    cartInfo: {},
    totalPrice: 0,
    selectedTypeCounts: 0,
  },
  // onLoad方法
  onLoad: function () {
    this._cartGoodsCount();
  },

  // onShow方法
  onShow: function () {
    var goodsItem = shoppingCart.getCartData(),
      cal = shoppingCart.getTotalPrice(goodsItem);
    this.setData({
      goodsItem: goodsItem,
      totalPrice: cal.account.toFixed(2),
      selectedTypeCounts: cal.selectedTypeCounts
    })
  },
  /*离开页面时，更新本地缓存*/
  onHide: function () {
    shoppingCart.execSetStorage(this.data.goodsItem);
  },
  // 单选按钮
  selectOneTap: function (event) {
    var id = event.currentTarget.dataset.gid,
      status = event.currentTarget.dataset.status,
      index = this._getProductIndexById(id);
    this.data.goodsItem[index].selectStatus = !status;
    this._resetCartData();
  },
  // 全选按钮
  selectAllTap: function (event) {
    var status = event.currentTarget.dataset.status == 'true';
    var data = this.data.goodsItem,
      len = data.length;
    for (let i = 0; i < len; i++) {
      data[i].selectStatus = !status;
    }
    this._resetCartData();
  },
  // 删除事件
  deleteTap: function (e) {
    var id = e.currentTarget.dataset.gid,
      index = this._getProductIndexById(id);
    this.data.goodsItem.splice(index, 1);
    this._resetCartData();
    shoppingCart.deleteGoods(id);
  },
  // 部分删除事件
  deleteAllTap: function (e) {
    var goodsItem = this.data.goodsItem,
      that = this;
    for (let i = goodsItem.length - 1; i >= 0; i--) {
      if (goodsItem[i].selectStatus == true) {
        var index = this._getProductIndexById(goodsItem[i].id);
        this.data.goodsItem.splice(index, 1);
      }
    }
    this._resetCartData();
  },
  // 获得商品下标
  _getProductIndexById: function (id) {
    var data = this.data.goodsItem,
      len = data.length;
    for (let i = 0; i < len; i++) {
      if (data[i].id == id) {
        return i;
      }
    }
  },
  // 获取购物车内是否有商品
  _cartGoodsCount: function () {
    var goods = wx.getStorageSync('cart');
    if (goods) {
      this.setData({
        cartHasGoods: true
      })
    } else {
      this.setData({
        cartHasGoods: false
      })
    }
  },
  // 刷新购物车数据
  _resetCartData: function () {
    var newData =
      shoppingCart.getTotalPrice(this.data.goodsItem);
    this.setData({
      goodsItem: this.data.goodsItem,
      totalPrice: newData.account.toFixed(2),
      selectedTypeCounts: newData.selectedTypeCounts
    })
  },
  // 点击数量加
  addCountTab: function (e) {
    var counts = 1;
    var index =
      this._getProductIndexById(e.currentTarget.dataset.gid);
    shoppingCart.addCount(e.currentTarget.dataset.gid);
    this.data.goodsItem[index].counts += counts;
    this._resetCartData();
  },
  // 点击数量减
  minCountTab: function (e) {
    var counts = 1;
    var index =
      this._getProductIndexById(e.currentTarget.dataset.gid);
    shoppingCart.minuCount(e.currentTarget.dataset.gid);
    this.data.goodsItem[index].counts -= counts;
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
  /**
   * param totalPrice 总金额
   * param cart 购物车
   */
  subbmitOrder: function (e) {
    wx.navigateTo({
      url: '../../pages/gmxx/gmxx?account=' + this.data.totalPrice +'&from=cart',
    });
  }
})
