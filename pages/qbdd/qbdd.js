var app = getApp();
var common = require("../../utils/common.js");
Page({
  /*** 页面的初始数据 */
  data: {

    title: '',
    // 选项卡
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    // 商品内容数据
    carts: [
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
      { imgurl: '../../images/sxs.jpg', type1: '清爽荡漾BB霜', type2: '清香型', price: 100, num: 1, yunfei: 0.00 },
    ],
    allOrder: [],
    dfOrder: [],
    dsOrder: [],
    dpOrder: [],
    shOrder: [],
  },
  /** * 滑动切换tab  */
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** * 点击tab切换  */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    var index = options.ld;
    this.setData({
      currentTab: index
    })
    /** * 获取系统信息  */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
  },
  _getAllMyOrder: function () {
    // Xindent / ddbh
    var that = this;
    common.netWorkRequest({
      url: 'Xindent/ddbh',
      params: {
        openid: wx.getStorageSync("openId")
      },
      onSuccess: function (res) {
        var allOrder = [],
          dfOrder = [],
          dsOrder = [],
          dpOrder = [],
          shOrder = [];
        wx.hideLoading();
        if (res.data instanceof Array) {
          for (let i = 0; i < res.data.length; i++) {
            allOrder.push(res.data[i]);
            if (res.data[i].code == 0) {
              dfOrder.push(res.data[i]);
            } else if (res.data[i].code == 1) {
              dsOrder.push(res.data[i]);
            } else if (res.data[i].code == 4) {
              dpOrder.push(res.data[i]);
            } else if (res.data[i].code == 3) {
              shOrder.push(res.data[i]);
            }
          }
          that.setData({
            allOrder: allOrder,
            dfOrder: dfOrder,
            dsOrder: dsOrder,
            dpOrder: dpOrder,
            shOrder: shOrder
          })
        }
        console.log(res);
      },
    })
  },
  /*** 生命周期函数--监听页面显示*/
  onShow: function () {
    this._getAllMyOrder();
    if (app.globalData.currentLocation == '') {
      this.setData({
        currentTab: 0
      });
    } else {
      var i = app.globalData.currentLocation;
      this.setData({
        currentTab: i
      });
    }
  },
  // 去付款
  gotoPayTap: function (e) {
    console.log(e)
    // console.log(this.data.dfOrder);return;
    let that=this;
    wx.navigateTo({
      url: '../../pages/gmxx/gmxx?img=' + e.currentTarget.dataset.info.shopphoto
      + '&id=' + e.currentTarget.dataset.info.id
      + '&name=' + e.currentTarget.dataset.info.info
      + '&price=' + e.currentTarget.dataset.info.money
      + '&ddbh=' + e.currentTarget.dataset.info.ddbh
      + '&count=' + e.currentTarget.dataset.info.num + '&from=df',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  // 确认收货
  QRSHTap: function (e) {
    var ddbh = e.currentTarget.dataset.ddbh;
    this._getQR(ddbh)
  },
  _getQR: function (ddbh) {
    common.netWorkRequest({
      // Xindent/shouhuo
      url: 'Xindent/shouhuo',
      params: {
        ddbh: ddbh
      },
      onSuccess: function (res) {
        wx.redirectTo({
          url: '../../pages/qbdd/qbdd',
        })
      }
    })
  },
  // 去评价
  gotoPJTap: function (e) {
    var sid = e.currentTarget.dataset.shopid,
      ddbh = e.currentTarget.dataset.ddbh;
    wx.navigateTo({
      url: '../../pages/xiepingjia/xiepingjia?sid=' + sid + '&ddbh=' + ddbh,
    });
  },
  // 客服按钮
})


