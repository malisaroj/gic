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

  onLoad: function(options) {
    wx.cloud.callFunction({
      name: "getPosts",
      data: {
        id: options.id,
      },
      success: (res) => {
        this.setData({
            post: res.result.data,
          }),
          console.log(res)

      },
      fail: console.error

    })
  }

})