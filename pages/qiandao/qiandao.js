// pages/qiandao/qiandao.js
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      { title: "每日有礼，每日惊喜", title_a: "100.00元", }
    ],
    menu_a: [
      { title_b: "今天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第2天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第3天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第4天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第5天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第6天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第7天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第8天", picUrl: "../../images/qiandao.jpg", }
    ]
  },
  onLoad: function () {
    common.netWorkRequest({
      url: 'Xuser/money_hb',
      method:'POST',
      params:{
        openid: wx.getStorageSync('openId'),
      },
      onSuccess:function(res) {
        wx.hideLoading();
        console.log(res);
      }
    })
  }
})