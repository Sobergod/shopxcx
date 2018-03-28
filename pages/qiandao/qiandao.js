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
      { title_b: "第二天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第三天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第四天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第五天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第六天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第七天", picUrl: "../../images/qiandao.jpg", },
      { title_b: "第八天", picUrl: "../../images/qiandao.jpg", }
    ]
  },
  onLoad: function () {
    common.netWorkRequest({
      url: 'Xuser /money_qd',
      method:'POST',
      params:{
        openid: wx.getStorageSync('onpenId'),
      },
      onSuccess:function(res) {
        console.log(res);
      }
    })
  }
})