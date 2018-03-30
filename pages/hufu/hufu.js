var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [
      { title: "销量" },
      { title: "新品" },
      { title: "收藏量" },
      { title: "价格" },
    ],
    shoucang: '收藏',
    menu_a: [],
    hasList: false,
    s:true
  },
  // 销量排序
  // 新品排序
  // 收藏量排序
  // 价格排序
  sort_price: function () {
    var sp = [];
    for (var i in this.data.menu_a) {
      sp.push(this.data.menu_a[i]);
    }
    if (this.data.s) {
      this.setData({
        menu_a: sp.sort(common.compareAscObj("shopmoney")),
        s:false
      })
    } else {
      this.setData({
        menu_a: sp.sort(common.compareDescObj("shopmoney")),
        s: true
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var fid = options.fid;
    var fname = options.fname
    wx.setNavigationBarTitle({
      title: fname
    })
    // 二级分类和商品
    common.netWorkRequest({
      url: "xshop",
      params: {
        f1: fid
      },
      method: "POST",
      onSuccess: function (res) {
        that.setData({
          menu_a: res.data
        })
      },
      onComplete: function (res) {
        that.setData({
          hasList: common.checkArrsLen(res.data)
        })
        wx.hideLoading();
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
})