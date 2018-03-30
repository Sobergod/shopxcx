// pages/xiangqing/xiangqing.js
var shoppingCart = require("../../pages/gouwuche/shoppingCart.js");
var common = require("../../utils/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/two.jpg',
      '../../images/two.jpg',
    ],
    menu: [
      { photo: "../../images/two.jpg" },
      { photo: "../../images/two.jpg" },
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    goodsItem: {},
    dataItem: {
      id: 1,
      name: "净颜清透祛痘保湿乳",//y
      jj: "保湿  祛痘  洁净毛孔",//y
      price: "￥300",//y
      sp_num: "商品编号：1234567890",//y
      counts: 1,//y
      picture: '../../images / two.jpg',
      yj: "原价3000",
      pp: "品牌 : ",
      pp_name: "兰希黎",
      sp_name: "商品名称：很好用的化妆品系列",
      sp_site: "商品产地：中国大陆",
      sp_fenlei: "分类：组合装",
    },
    id: 1,
    name: "净颜清透祛痘保湿乳",//y
    jj: "保湿  祛痘  洁净毛孔",//y
    price: "￥300",//y
    counts: 1,//y
    sp_num: "商品编号：1234567890",//y
    yj: "原价3000",
    pp: "品牌 : ",
    pp_name: "兰希黎",
    sp_name: "商品名称：很好用的化妆品系列",
    sp_site: "商品产地：中国大陆",
    sp_fenlei: "分类：组合装",
  },
  onLoad: function (options) {
    var gid = options.gid;
    this._getGoodsItem(gid);
  },
  // 跳转购物车页面 
  gotoCart: function () {
    wx.switchTab({
      url: '../../pages/gouwuche/gouwuche',
    })
  },
  // 查询单个商品
  _getGoodsItem: function (gid) {
    var goodsNum,
      that = this;
    common.netWorkRequest({
      url: "xshop",
      params: {
        shopid: gid,
      },
      onSuccess: function (res) {
        console.log(res);
        var photomore = [],
          shopphotos = [],
          goodsItem = res.data[0];
        goodsItem.shopPhotos = res.data[0].shopphotos.split(',');
        goodsItem.photoMore = res.data[0].photomore.split(',');
        that.setData({
          goodsItem: goodsItem
        })
      },
    })
  },
  // 添加购物车
  addInCartTab: function () {
    common.st_success("添加购物车成功");
    let goodsItem = {
      id: this.data.goodsItem.shopid,
      name: this.data.goodsItem.shopname,
      price: this.data.goodsItem.shopmoney,
      brief: this.data.goodsItem.shopinfo,
      picture: this.data.goodsItem.shopphoto
    }
    let counts = this.data.counts
    shoppingCart.addCart(goodsItem, counts);
  },
})