/**
 * author: chenxin
 * 
*/
const webRoot = require('config.js').webRoot;
/*
* param {String} url 接口名
* param {Object} params 传入后台数据
* param {String} method 请求方式
* param {function} success 成功执行
* param {function} fail 失败执行
* param {function} complete 完成执行
*/
function myRequest(url, params, method, onSuccess, onFail, onComplete) {
  // 设置默认值
  function onSuccess() { }
  function onFail() { }
  function onComplete() { }
  var params = arguments[1] ? arguments[1] : {};
  var method = arguments[2] ? arguments[2] : "POST";
  var onSuccess = arguments[3] ? arguments[3] : onSuccess();
  var onFail = arguments[4] ? arguments[4] : onFail();
  var onComplete = arguments[5] ? arguments[5] : onComplete();
  wx.showLoading({
    title: "加载中"
  });
  wx.request({
    url: webRoot.host + url,
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: method,
    success: function (res) {
      wx.hideLoading();
      onSuccess(res);
    },
    fail: function (res) {
      wx.hideLoading();
      onFail(res);
    },
    complete: function (res) {
      wx.hideLoading();
      onComplete(res);
    }
  })
}
/*
* param {Object} NetWork 请求对象
* param {String} NetWork.url 接口名
* param {Object} NetWork.params 传入后台数据
* param {String} NetWork.method 请求方式
* param {function} NetWork.success 成功执行
* param {function} NetWork.fail 失败执行
* param {function} NetWork.complete 完成执行
*/
function netWorkRequest(request) {

  // 初始化request
  var NetWork = {
    url: request.url,
    data: request.params ? request.params : {},
    method: request.method ? request.method : "POST",
    reSuccess: function (res) {
      wx.hideLoading();
    },
    reFail: function (res) {
      st_fail("加载失败");
      wx.hideLoading();
    },
    reComplete: function (res) {
      st_success("加载成功");
      wx.hideLoading();
    }
  }
  wx.showLoading({
    title: '加载中',
  });
  wx.request({
    url: webRoot.host + NetWork.url,
    data: NetWork.data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: NetWork.method,
    success: function (res) {
      var code = res.statusCode.toString();
      var startChar = code.charAt(0);
      if (startChar == '2') {
        request.onSuccess ? request.onSuccess(res) : NetWork.reSuccess(res);
      }
    },
    fail: function (res) {
      request.onFail ? request.onFail(res) : NetWork.reFail(res);
    },
    complete: function (res) {
      request.onComplete ? request.onComplete(res) : NetWork.reComplete(res);
    },
  })
}

// 判断数组长度
function checkArrsLen(arr) {
  if (arr) {
    if (arr.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
}

// 对象升序排序方法
function compareAscObj(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
  }
}
// 对象降序排序方法
function compareDescObj(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}
// 界面提示
function st_success(msg) {
  wx.showToast({
    title: msg,
    image: "../../images/success.png",
  })
}
function st_fail(msg) {
  wx.showToast({
    title: msg,
    image: "../../images/fail.png",
  })
}
function st_complete(msg) {
  wx.showToast({
    title: msg,
    image: "../images/success.png",
  })
}
module.exports = {
  myRequest,
  checkArrsLen,
  netWorkRequest,
  st_success,
  st_fail,
  st_complete,
  compareAscObj,
  compareDescObj
}