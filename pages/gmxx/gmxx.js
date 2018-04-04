// pages/gmxx/gmxx.js
var shoppingCart = require('../../pages/gouwuche/shoppingCart.js');
var pay = require('../../utils/pay.js');
var app = getApp()
Page({
  data: {
    orderId: null,
    chooseSize: false,
    animationData: {},
    addressInfo: null,
    fromCartFlag: true,
    carts: [
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00, kuaidi: "发货时间：卖家承诺24小时内发货" },
    ],
    account: 0,

  },
  ceshi: function () {
    this._firstTimePay()
  },
  actioncnt: function () {
    wx.showActionSheet({
      itemList: ['满300减50', '满200减30', '满100减10'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  tijiao: function () {
    wx.showActionSheet({
      itemList: ['余额支付', '微信支付'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      account: options.account,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var productsArr = shoppingCart.getCartData(true);
    var selectedCounts = shoppingCart.getTotalPrice(productsArr).selectedCounts;
    var address = wx.getStorageSync("selectAddress") || null;
    // this.data.account = options.totalPrice;
    this.setData({
      carts: productsArr,
      selectedCounts: selectedCounts,
      orderStatus: 0,
      addressInfo: address
    })
  },
  addressEdit: function (e) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: that.setAddressInfo(res),
        }
        wx.setStorageSync("selectAddress", addressInfo);
        that._bindAddressInfo(addressInfo);
      },
    });
  },
  // 绑定地址信息
  _bindAddressInfo: function (addressInfo) {
    this.setData({
      addressInfo: addressInfo
    })
  },
  // 设置地址信息
  setAddressInfo: function (res) {
    var province = res.provinceName,
      city = res.cityName,
      county = res.countyName,
      detail = res.detailInfo;
    var totalDetail = city + county + detail;
    if (!this.isCenterCity(province)) {
      totalDetail = province + totalDetail;
    }
    return totalDetail;
  },
  // 判断直辖市
  isCenterCity: function (name) {
    var centerCity = ['北京市', '天津市', '上海市', '重庆市'],
      flag = centerCity.indexOf(name) >= 0;
    return flag;
  },

  // 第一次支付
  _firstTimePay: function () {
    var orderInfo = [],
      productInfo = this.data.carts;
    for (let i = 0; i < productInfo.length; i++) {
      orderInfo.push({
        product_id: productInfo[i].id,
        count: productInfo[i].counts
      })
    }
    var that = this;
    // 先要生成订单号再支付
    pay.doOrder(orderInfo, function (data) {
      // 如果后台返还订单号
      if (data.pass) {
        var id = data.order.id;
        that.data.orderId = id,
          that.data.fromCartFlag = false;
        //  支付
        // that._execPay(id);
      } else {
        // Todo:下单失败
      }
    })
  },
  /**
   * 开始支付
   */
  _execPay: function (id) {
    var that = this;
    pay.execPay(id, function (resCode) {
      if (resCode != 0) {
        // 删除购物车中相应产品
        that.deleteGoodsItem();
        var flag = resCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order'
        });
      }
    })
  },
  // 清购物车
  deleteGoodsItem: function () {
    var ids = [],
      arr = this.data.carts;
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
    }
    shoppingCart.deleteGoods(ids)
  }
})