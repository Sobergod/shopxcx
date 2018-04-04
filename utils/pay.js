var common = require("common.js");
/**
 * 下订单方法
 * 生成订单
 * 将商品信息和用户信息返回给后台
 * 后台返回订单编号
 */
function doOrder(param, callback) {
  var that = this;
  var param = JSON.stringify(param);
  var allParams = {
    url: 'Xpay',
    method: 'POST',
    params: {
      arr: param,
      openid:wx.getStorageSync("openId"),
    },
    onSuccess: function (data) {
      setOrderStatusSync(true);
      callback && callback(data);
    },
  };
  common.netWorkRequest(allParams);
}

/**
 * 支付
 * callback 返回三种状态 0 1 2
 * 0 代表支付由于服务器端失败
 * 1 代表支付失败或者取消支付
 * 2 代表支付成功
 */
function execPay(orderNumber, callback) {
  var allParams = {
    url: '',
    params: {
      orderNumber: orderNumber
    },
    onSuccess: function (res) {
      var timeStamp = res.timeStamp;
      if (timeStamp) {
        wx.requestPayment({
          'timeStamp': timeStamp.toString(),
          'nonceStr': res.nonceStr,
          'package': res.package,
          'signType': res.signType,
          'paySign': res.paySing,
          success: function (res) {
            callback && callback(2);
          },
          fail: function (res) {
            callback && callback(1);
          },
          complete: function (res) { },
        })
      } else {
        callback && callback(0);
      }
    }
  }
}
// 缓存订单状态值
function setOrderStatusSync(data) {
  wx.setStorageSync("orderStatus", data)
}
module.exports = {
  doOrder
}