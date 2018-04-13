var common = require("../../utils/common.js");
var time = require("../../utils/util.js");
Page({
  //初始化数据
  data: {
    yj: ''
  },
  onLoad: function () {
    this.getDate();
  },
  getInputVal: function (e) {
    this.setData({
      yj: e.detail.value
    })
  },
  formSubmit: function (e) {
    var time = this.getDate();
    this._inputVal(this.data.yj, time);
  },
  getDate: function () {
    var date = Date.parse(new Date());
    date = date / 1000;
    return date;
  },
  _inputVal: function (val, time) {
    var that = this;
    common.netWorkRequest({
      url: "Xfeedback/add",
      params: {
        openid: wx.getStorageSync("openId"),
        name: wx.getStorageSync("userInfo").userName,
        info: val,
        atime: time,
        img: wx.getStorageSync("userInfo").userImg
      },
      onSuccess: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          wx.showModal({
            title: '提交失败',
          })
        } else {
          wx.showModal({
            title: '提交成功',
          })
        }
      }
    })
  }
})