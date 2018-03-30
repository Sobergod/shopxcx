var common = require('common.js');
/**
 * 添加和取消收藏方法
 * param {int} collectionId 当前商品id
 */ 
function addCollection(collectionId) {
  var collection = {};
  collection.shopid = collectionId;
  collection.openid = wx.getStorageSync('openId');
  _setCollectionApi('Xshopping/collect_add', collection);
}
function removeCollection(collectionId) {
  var collection = {};
  collection.shopid = collectionId;
  collection.openid = wx.getStorageSync('openId');
  _setCollectionApi('Xshopping/collect_del', collection);
}
/**
 * 调用添加或删除接口
 * param {string} url 接口地址
 * param {obj} collectionData 参数
 */
function _setCollectionApi(url, collectionData) {
  common.newWorkRequest({
    url: url,
    params: collectionData,
    onSuccess: function (res) {
      console.log(res);
    }
  })
}