//index.js
const app = getApp()

Page({
  data: {
    list: [{
      "text": "",
      "iconPath": "../../icons/home-2-fill.png",
      "selectedIconPath": "../../icons/home-2-fill.png",
    },
    {
      "text": "",
      "iconPath": "../../icons/feedback-fill.png",
      "selectedIconPath": "../../icons/feedback-fill.png",
    },
    {
      "text": "",
      "iconPath": "../../icons/news.png",
      "selectedIconPath": "../../icons/news.png",
    }
    ],
  },
  onLoad: function () {
    wx.cloud.callFunction({
      name: "getNews",
      success: (res) => {
        console.log(res);

        this.setData({
          news: res.result.data
        })
      },
      fail: console.error
    })
  }
})