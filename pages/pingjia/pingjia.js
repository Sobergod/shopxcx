// pages/pingjia/pingjia.js
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      { photo: "../../images/sxs.jpg", name: "小王", time: "2018.03.28", wenben: "商品收到了，包装很精美，还有个好看的化妆箱我喜欢，我都用自然堂的商品，实在实体店买的，这是第一次在网上购化妆品，用后一样会长期关注，好评。", pct: ["../../images/two.jpg", "../../images/two.jpg", "../../images/two.jpg", "../../images/two.jpg"]},
      { photo: "../../images/sxs.jpg", name: "小王", time: "2018.03.28", wenben: "商品收到了，包装很精美，还有个好看的化妆箱我喜欢，我都用自然堂的商品，实在实体店买的，这是第一次在网上购化妆品，用后一样会长期关注，好评。", pct: ["../../images/two.jpg"]},
    ],
  },
  // 图片预览
  preViewImgTap: function (e) {
    var src = e.currentTarget.dataset.src;
    var list = e.currentTarget.dataset.alist; 
    var that = this;
    wx.previewImage({
      current: src,
      urls: list,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gid = options.gid;
    common.netWorkRequest({
      url: '',
      params: {},
      onSuccess: function () {

      }
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {

  },
})
