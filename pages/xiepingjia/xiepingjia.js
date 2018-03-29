Page({
  data: {
    star: 0,
    starMap: [
      '非常差',
      '差',
      '一般',
      '好',
      '非常好',
    ],
  },
  formSubmit: function (e) {
    this.setData({
      allValue: e.detail.value
    })
  },
  myStarChoose(e) {
    let star = parseInt(e.target.dataset.star) || 0;
    this.setData({
      star: star,
    });
  }
});