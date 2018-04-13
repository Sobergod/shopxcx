// pages/gmxx/gmxx.js
var shoppingCart = require('../../pages/gouwuche/shoppingCart.js');
var pay = require('../../utils/pay.js');
var common = require('../../utils/common.js');
const webRoot = require('../../utils/config.js').webRoot;
var app = getApp()
Page({
  data: {
    orderId: -1,
    addressInfo: null,
    fromCartFlag: true,
    carts: [],
    detail: [],
    ptdetail: [],
    df: [],
    useYhq: [],
    myYhq: [],
    account: 0,
    status: -1,
    ptstatus: true,
    yustatus: 2,
    fanilCount: 0,
    hbYuE: [],
    iid: -1//-1 不用优惠 0 红包  >0 优惠券
  },
  ceshi: function () {
    this._firstTimePay()
  },
  actioncntTap: function () {
    var that = this,
      fanilCount = this.data.fanilCount,
      account = this.data.account;
    this.setData({
      fanilCount: account
    })
    wx.showActionSheet({
      itemList: this.data.myYhq,
      success: function (res) {
        fanilCount = account;
        var index = res.tapIndex
        var item = that.data.useYhq[res.tapIndex];
        if (Number(account) > Number(item.limitmoney)) {
          console.log(account);
          console.log(item.limitmoney);
          console.log(item)
          var sum = 0;
          sum = fanilCount - item.money;
          that.setData({
            fanilCount: sum.toFixed(2),
            iid:item.id
          })
        } else {
          wx.showModal({
            title: '错误',
            content: '不符合使用规则,选则其他优惠吧',
          })
        }
      },
    })
  },
  // 红包
  useHbTap: function () {
    var that = this,
      fanilCount = this.data.fanilCount,
      account = this.data.account;
    this.setData({
      fanilCount: account
    });
    wx.showActionSheet({
      itemList: this.data.hbYuE,
      success: function (res) {
        fanilCount = account;
        var index = res.tapIndex
        var item = that.data.hbYuE[0];
        if (Number(account) > Number(item)) {
          var sum = 0;
          sum = fanilCount - item;
          that.setData({
            fanilCount: sum.toFixed(2),
            iid: 0
          })
        } else {
          wx.showModal({
            title: '错误',
            content: '不符合使用规则,选则其他优惠吧',
          })
        }
      },
    })
  },
  tijiao: function () {
    let that = this;
    let shopData = [];
    let shopDataItem = {}
    wx.showActionSheet({
      itemList: ['余额支付', '微信支付'],//0-余额;1-微信
      success: function (res) {
        if (that.data.status == 3) {
          shopData = [{
            "id": that.data.ptdetail[0].id,
            "num": that.data.ptdetail[0].counts
          }]
          common.netWorkRequest({
            url: 'Xindent/pt2',
            params: {
              openid: wx.getStorageSync("openId"),
              shop: JSON.stringify(shopData),
              address: that.data.addressInfo.totalDetail,
              name: that.data.addressInfo.name,
              phone: that.data.addressInfo.mobile,
              atime: Date.parse(new Date()) / 1000,
              code: res.tapIndex,
              iid: that.data.iid
            },
            onSuccess: function (res) {
              let ddbh = res.data.ddbh;
              if (res.data.code == 1) { //支付可调用
                common.netWorkRequest({
                  url: 'pay.php',
                  params: {
                    openid: wx.getStorageSync("openId"),
                    sum: res.data.money
                  },
                  onSuccess: function (res) {
                    console.log(res.data)
                    wx.requestPayment({
                      'timeStamp': res.data.timeStamp.toString(),
                      'nonceStr': res.data.nonce_str,
                      'package': "prepay_id=" + res.data.prepay_id,
                      'signType': "MD5",
                      'paySign': res.data.paySign,
                      success: function (res) {
                        console.log(res)
                      },
                      fail: function (res) {
                        console.log(res)
                      },
                      complete: function (res) {
                        common.netWorkRequest({
                          url: 'Xindent/paymentok',
                          params: {
                            ddbh: ddbh
                          },
                        })
                      },
                    })
                  }
                })
              } else { //支付不可调用
                common.st_fail('支付失败！');
              }
            }
          })
        } else if (that.data.status == 1 || that.data.status == 2) {
          if (that.data.status == 1) { //cart
            for (let i = 0; i < that.data.carts.length; i++) {
              shopDataItem.id = that.data.carts[i].id;
              shopDataItem.num = that.data.carts[i].counts;
              console.log(that.data.carts[i].id, that.data.carts[i].counts)
              shopData.push(shopDataItem);
              shopDataItem = {};
            }
          } else if (that.data.status == 2) { //detail
            shopData = [{
              "id": that.data.detail[0].id,
              "num": that.data.detail[0].counts
            }]
          }
          wx.request({ //调起验证支付
            url: webRoot.host + 'Xindent/payment',
            data: {
              openid: wx.getStorageSync("openId"),
              shop: JSON.stringify(shopData),
              address: that.data.addressInfo.totalDetail,
              name: that.data.addressInfo.name,
              phone: that.data.addressInfo.mobile,
              atime: Date.parse(new Date()) / 1000,
              code: res.tapIndex,
              iid: that.data.iid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "post",
            success: function (res) { //查询返回值，成功则进行支付调起
              console.log(res);
              let ddbh = res.data.ddbh;
              if (res.data.code == 1) { //支付可调用
                common.netWorkRequest({
                  url: 'pay.php',
                  params: {
                    openid: wx.getStorageSync("openId"),
                    sum: res.data.money,
                    ddbh: res.data.ddbh
                  },
                  onSuccess: function (res) {
                    console.log(res.data)
                    wx.requestPayment({
                      'timeStamp': res.data.timeStamp.toString(),
                      'nonceStr': res.data.nonce_str,
                      'package': "prepay_id=" + res.data.prepay_id,
                      'signType': "MD5",
                      'paySign': res.data.paySign,
                      success: function (res) {
                        console.log(res)
                      },
                      fail: function (res) {
                        wx.showModal({
                          title: '支付提示',
                          content: '放弃支付',
                          success: function () {
                            wx.navigateTo({
                              url: '../../pages/pay-result/pay-result?flag=false',
                            })
                          }
                        })
                        console.log(res)
                      },
                      complete: function (res) {
                        common.netWorkRequest({
                          url: 'Xindent/paymentok',
                          params: {
                            ddbh: ddbh
                          },
                        })
                      },
                    })
                  }
                })
              } else if (res.data.code == 0) { //支付不可调用
                common.st_fail('支付失败！');
              } else if (res.data.code == 2) {
                common.st_fail('余额不足！')
              } else if (res.data.code == 10) {
                wx.showModal({
                  title: '提示',
                  content: res.data.info,
                  showCancel: false,
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        }
        else if (that.data.status == 4) {
          //订单跳转过来的不能进行余额支付验证
          if (res.tapIndex == 0) {
            wx.showModal({
              title: '提示',
              content: '不支持该支付方式',
              showCancel: false,
            })
            return;
          }

          console.log(that.data.df)
          common.netWorkRequest({
            url: 'pay.php',
            params: {
              openid: wx.getStorageSync("openId"),
              sum: that.data.df[0].price,
              ddbh: that.data.df[0].ddbh
            },
            onSuccess: function (res) {
              console.log(res.data)
              wx.requestPayment({
                'timeStamp': res.data.timeStamp.toString(),
                'nonceStr': res.data.nonce_str,
                'package': "prepay_id=" + res.data.prepay_id,
                'signType': "MD5",
                'paySign': res.data.paySign,
                success: function (res) {
                  console.log(res)
                },
                fail: function (res) {
                  console.log(res)
                },
                complete: function (res) {
                  common.netWorkRequest({
                    url: 'Xindent/paymentok',
                    params: {
                      ddbh: that.data.df[0].ddbh
                    },
                  })
                },
              })
            }
          })
        }

      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  // 查红包余额
  _getHbYe: function () {
    var that = this;
    common.netWorkRequest({
      url: 'Xuser/money_hb',
      params: {
        openid: wx.getStorageSync("openId")
      },
      onSuccess: function (res) {
        var arr = [];
        arr[0] = res.data.smoney;
        that.setData({
          hbYuE: arr,
        })
      }
    })
  },
  // 查我的优惠券
  _getMyYhq: function () {
    var that = this;
    common.netWorkRequest({
      url: 'Xmarketing/find_Coupon',
      params: {
        openid: wx.getStorageSync("openId")
      },
      onSuccess: function (res) {
        var arr = [];
        for (let i = 0; i < res.data.length; i++) {
          let a = '满 ' + res.data[i].limitmoney + ' 减' + res.data[i].money;
          arr.push(a);
        }
        console.log(res);
        if (res.data instanceof Array) {
          that.setData({
            myYhq: arr,
            useYhq: res.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this._getHbYe();
    this._getMyYhq();
    if (options.from === 'cart') {
      this.setData({
        status: 1,
        account: options.account,
        fanilCount: options.account,
      })
    } else if (options.from === 'detail') {
      var detail = {
        id: options.id,
        img: options.img,
        name: options.name,
        price: options.price,
        counts: options.count
      },
        details = [];
      details.push(detail);
      this.setData({
        status: 2,
        account: options.price,
        fanilCount: options.price,
        detail: details
      })
    } else if (options.from === 'pt') {
      var ptdetail = {
        id: options.id,
        img: options.img,
        name: options.name,
        price: options.price,
        counts: options.count
      },
        ptdetails = [];
      ptdetails.push(ptdetail);
      this.setData({
        status: 3,
        account: options.price,
        fanilCount: options.price,
        ptdetail: ptdetails
      })
      this.setData({
        ptstatus: false,
      })
    } else if (options.from === 'df') {
      let df = {
        id: options.id,
        img: options.img,
        name: options.name,
        price: options.price,
        counts: options.count,
        ddbh: options.ddbh
      }
      let dfOrder = [];
      dfOrder.push(df);
      this.setData({
        status: 4,
        account: options.price,
        fanilCount: options.price,
        df: dfOrder
      })
    }
  },
  // 查优惠券
  _getYhq: function () {
    common.netWorkRequest({
      url: "Xmarketing/listDiscount",
      method: "GET",
      params: {
        id: gid,
      },
      onSuccess: function (res) {
        that.setData({
          goodsItem: res.data[0],
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    var productsArr = shoppingCart.getCartData(true);
    var selectedCounts = shoppingCart.getTotalPrice(productsArr).selectedCounts;
    var address = wx.getStorageSync("selectAddress") || null;
    // this.data.account = options.totalPrice;
    this.setData({
      carts: productsArr,
      selectedCounts: selectedCounts,
      orderStatus: 0,
      addressInfo: address
    })
  },
  addressEdit: function (e) {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          name: res.userName,
          mobile: res.telNumber,
          totalDetail: that.setAddressInfo(res),
        }
        wx.setStorageSync("selectAddress", addressInfo);
        that._bindAddressInfo(addressInfo);
      },
    });
  },
  // 绑定地址信息
  _bindAddressInfo: function (addressInfo) {
    this.setData({
      addressInfo: addressInfo
    })
  },
  // 设置地址信息
  setAddressInfo: function (res) {
    var province = res.provinceName,
      city = res.cityName,
      county = res.countyName,
      detail = res.detailInfo;
    var totalDetail = city + county + detail;
    if (!this.isCenterCity(province)) {
      totalDetail = province + totalDetail;
    }
    return totalDetail;
  },
  // 判断直辖市
  isCenterCity: function (name) {
    var centerCity = ['北京市', '天津市', '上海市', '重庆市'],
      flag = centerCity.indexOf(name) >= 0;
    return flag;
  },

  // 第一次支付
  _firstTimePay: function () {
    var orderInfo = [],
      // 判断单条商品还是购物车商品
      status = this.data.status,
      productInfo = [];
    console.log(status)
    if (status === 1) {
      productInfo = this.data.carts;
    } else if (status == 2) {
      productInfo = this.data.detail;
    }
    for (let i = 0; i < productInfo.length; i++) {
      orderInfo.push({
        product_id: productInfo[i].id,
        count: productInfo[i].counts
      })
    }
    var that = this;
    // 先要生成订单号再支付
    pay.doOrder(orderInfo, function (data) {
      // 如果后台返还订单号
      if (data.pass) {
        var id = data.order.id;
        that.data.orderId = id,
          that.data.fromCartFlag = false;
        //  支付
        // that._execPay(id);
      } else {
        // Todo:下单失败
      }
    })
  },
  /**
   * 开始支付
   */
  _execPay: function (id) {
    var that = this;
    pay.execPay(id, function (resCode) {
      if (resCode != 0 && that.data.status == 1) {
        // 删除购物车中相应产品
        that.deleteGoodsItem();
        var flag = resCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order'
        });
      } else {
        var flag = resCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + id + '&flag=' + flag + '&from=order'
        });
      }
    })
  },
  // 清购物车
  deleteGoodsItem: function () {
    var ids = [],
      arr = this.data.carts;
    for (let i = 0; i < arr.length; i++) {
      ids.push(arr[i].id);
    }
    shoppingCart.deleteGoods(ids)
  }
})