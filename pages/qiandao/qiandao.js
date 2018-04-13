// pages/qiandao/qiandao.js
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      { title: "每日有礼，每日惊喜", title_a: "0.00元", }
    ],
    menu_a: [
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", },
      { title_b: " ", picUrl: "../../images/qiandao.jpg", }
    ],
    resData: '',
    total: 0,
  },
  listenerSwitch: function (e) {
    if (e.detail.value == true) {
      wx.showModal({
        title: '提示',
        content: '已打开自动签到',
      })
      wx.setStorageSync("qd", 1);
      this.setData({
        status: wx.getStorageSync("qd") || 1,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '已关闭自动签到',
      })
      wx.setStorageSync("qd", 0);
      this.setData({
        status: wx.getStorageSync("qd") || 0,
      })
    }
  },
  onLoad: function () {
    this._getHBTotal();
    if (wx.getStorageSync("openId") != '') {
      var that = this;
      common.netWorkRequest({
        url: 'Xuser/money_qd',
        method: 'POST',
        params: {
          openid: wx.getStorageSync('openId'),
        },
        onSuccess: function (res) {
          console.log(res);
          wx.hideLoading();
          for (let i = 0; i < that.data.menu_a.length; i++) {
            if (res.data.day == (i + 1)) {
              that.data.menu_a[i].title_b = `今天`;
            } else {
              that.data.menu_a[i].title_b = `第` + (i + 1) + `天`;
            }
          }
          that.data.menu[0].title_a = res.data.money + "元";
          that.setData({
            resData: res.data,
            menu_a: that.data.menu_a,
            menu: that.data.menu
          });
          if (that.data.status == 1) {
            that._getHB();
          }
        }
      })
    } else {
      wx.showModal({
        title: '暂未登陆',
        content: '请退出后重新登陆!',
        success: function () {
          wx.navigateBack({
            delta: 1,
          })
        }
      })
    }
    this.setData({
      status: wx.getStorageSync("qd") || 0,
    })

  },
  _getHB: function () {
    var that = this;
    if (this.data.resData.info == "今日已经签到过了！") {
      common.st_success(this.data.resData.info);
      return;
    } else {
      common.netWorkRequest({
        url: 'Xuser/money_hb',
        method: 'POST',
        params: {
          openid: wx.getStorageSync('openId'),
        },
        onSuccess: function (res) {
          console.log(res);
          wx.hideLoading();
          that.data.menu[0].title_a = res.data.money + "元";
          that.setData({
            menu: that.data.menu
          })
          common.st_success("签到成功！")
        }
      })
    }
  },
  moneyHB: function (event) {
    this._getHB();
  },
  _getHBTotal: function () {
    var that = this;
    common.netWorkRequest({
      url: 'Xuser/money_hb',
      method: 'POST',
      params: {
        openid: wx.getStorageSync('openId'),
      },
      onSuccess: function (res) {
        console.log(res);
        wx.hideLoading();
        that.setData({
          total: res.data.money
        })
      }
    })
  }
})