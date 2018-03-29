Page({
  //初始化数据
  data: {
    
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      allValue: e.detail.value
    })
  },
 

})