// pages/youhuiquan/youhuiquan.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu_b: [
      { tpUrl: "../../images/jxhd_01.jpg", title: "全场满30减2", new: "领取后6天内有效" },
      { tpUrl: "../../images/jxhd_01.jpg", title: "全场满3000减200", new: "领取后6天内有效" }
    ],
    status:false,

  },
  onLoad: function (options) {
    common.netWorkRequest({
      url: 'Xuser/coupon_usersel',
      onSuccess: function (res) {
        console.log(res);
      }
    })
  },
  onShow: function () {

  },

})