function getUserInfo () {
  var userData = {}
  wx.getUserInfo({
    withCredentials: true,
    success: function(res) {
      userData.userImg = res.userInfo.avatarUrl,
      userData.userName = res.userInfo.nickName
    },
    fail: function(res) {},
    complete: function(res) {
      wx.setStorageSync('userInfo',userData);
    },
  })
}
module.exports= {
  getUserInfo
}