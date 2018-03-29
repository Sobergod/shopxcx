/**
 * author: chenxin
 * 
*/
var cartName = "cart"

//  获取购物车缓存
function getCartData() {
  var res = wx.getStorageSync(cartName);
  if (!res) {
    res = [];
  }
  return res;
}

// 更新缓存方法
function execSetStorage(data) {
  wx.setStorageSync(cartName, data)
}
/**
 * 添加购物车方法
 * param {obj} item 商品
 * param {int} count 数量
 */
function addCart(item, counts) {
  var cartData = getCartData();
  var isInCart = _cartHasThisItem(item.id, cartData);
  if (isInCart.index == -1) {
    item.counts = counts;
    item.selectStatus = true;
    cartData.push(item);
  } else {
    cartData[isInCart.index].counts += counts;
  }
  execSetStorage(cartData);
}

// 数量增加
function addCount(id) {
  var cartData = getCartData(),
    hasInfo = _cartHasThisItem(id, cartData);
  if (hasInfo.index != -1) {
    cartData[hasInfo.index].counts += 1;
  }
  execSetStorage(cartData);  //更新本地缓存
}
// 数量减少
function minuCount(id) {
  var cartData = getCartData(),
    hasInfo = _cartHasThisItem(id, cartData);
  if (hasInfo.index != -1) {
    if (hasInfo.data.counts > 1) {
      cartData[hasInfo.index].counts -= 1;
    }
  }
  execSetStorage(cartData);  //更新本地缓存
}

// 计算购物车商品总价格
function getTotalPrice(data) {
  var len = data.length,
    account = 0,
    // 购买商品总个数
    selectedCounts = 0,
    selectedTypeCounts = 0;
  let multiple = 100;
  for (let i = 0; i < len; i++) {
    if (data[i].selectStatus) {
      account +=
        data[i].counts * multiple * Number(data[i].price) * multiple;
      selectedCounts += data[i].counts;
      selectedTypeCounts++;
    }
  }
  return {
    selectedCounts: selectedCounts,
    selectedTypeCounts: selectedTypeCounts,
    account: account / (multiple * multiple)
  }
}
// 删除单个商品
function deleteOneGoods() {
}
// 删除全部商品
function deleteAllGoods() {
}
// 单选
function selectOne() {
}
// 全选
function selectAll() {
}
/**
 *  判断购物车中是否有商品
 *  param {int} id 商品id
 *  param {arry} arr 购物车数组
 */
function _cartHasThisItem(id, arr) {
  var item,
    result = { index: -1 }
  for (let i = 0; i < arr.length; i++) {
    item = arr[i];
    if (item.id == id) {
      result = {
        index: i,
        data: item
      };
      break;
    }
  }
  return result;
}
// 修改商品数量
function _changeCartCount(id, counts) {
  var cartData = getCartData(),
    hasInfo = _cartHasThisItem(id, cartData);
  if (hasInfo.index != -1) {
    if (hasInfo.data.counts > 1) {
      cartData[hasInfo.index].counts += counts;
    }
  }
  execSetStorage(cartData);  //更新本地缓存
}
module.exports = {
  getTotalPrice,
  addCart,
  deleteOneGoods,
  deleteAllGoods,
  addCount,
  minuCount,
  selectOne,
  selectAll
}