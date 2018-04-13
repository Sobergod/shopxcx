// pages/search/search.js
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    resStatus: false,
    status: false,
    hstatus: false,
    historyList: [],
    goodsList: [],
  },
  getInputVal: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  restInpTap: function () {
    this.setData({
      searchValue: '',
    })
  },
  goToDetail: function (e) {
    var gid = e.currentTarget.dataset.gid
    wx.navigateTo({
      url: '../../pages/xiangqing/xiangqing?gid=' + gid,
    })
  },
  searchTap: function () {
    var seVal = this.data.searchValue,
      historyList = wx.getStorageSync('historyList') || [];
    if (seVal == '') {
      wx.showModal({
        title: '请填写搜索商品',
      })
    } else {
      this._getSerachResult(seVal);
      historyList.unshift(seVal);
      wx.setStorageSync('historyList', historyList)
      console.log(this.data.searchValue);
    }
  },

  delHisTap: function () {
    var that = this;
    wx.showModal({
      title: '确认全部删除吗?',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('historyList', '');
          that.setData({
            historyList: [],
            hstatus: false
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  historyItemTap: function (e) {
    var val = e.currentTarget.dataset.detail;
    this._getSerachResult(val);
  },
  _getSerachResult: function (name) {
    var that = this;
    common.netWorkRequest({
      url: 'Xshop/shopSeek',
      params: {
        name: name
      },
      onSuccess: function (res) {
        console.log(res);
        if (res.data.code == 0) {
          that.setData({
            resStatus: false,
            status: true,
          })
        } else {
          that.setData({
            goodsList: res.data,
            resStatus: true,
            status: true,
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      historyList: wx.getStorageSync("historyList")
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      historyList: wx.getStorageSync("historyList")
    })
    if (wx.getStorageSync("historyList").length > 0) {
      console.log(1);
      this.setData({
        hstatus: true,
      })
    }
  },
})