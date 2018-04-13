var common = require("../../utils/common.js");
Page({
  data: {
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
    ptVal: '',
    sid: -1,
    ddbh: -1,
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      sid: options.sid,
      ddbh: options.ddbh
    })
  },
  bindTextAreaBlur: function (e) {
    var val = e.detail.value;
    this.setData({
      ptVal: val,
    })
  },
  submit: function () {
    if (this.data.sid != -1 && this.data.ddbh != -1) {
      var that = this;
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      common.netWorkRequest({
        url: 'Xcomment/add',
        params: {
          openid: wx.getStorageSync("openId"),
          name: wx.getStorageSync("userInfo").userName,
          img: wx.getStorageSync("userInfo").userImg,
          info: that.data.ptVal,
          shopid: that.data.sid,
          atime: timestamp,
          ddbh: that.data.ddbh,
        },
        onSuccess: function (res) {
          console.log(res);
          if(res.data.code == 1) {
            wx.showModal({
              title: '评价成功',
              success:function() {
                wx.redirectTo({
                  url: '../../pages/qbdd/qbdd',
                })
              }
            })
          }

        }
      })
    }
  },
  formSubmit: function (e) {
    this.setData({
      allValue: e.detail.value
    })
  },
  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  }
});