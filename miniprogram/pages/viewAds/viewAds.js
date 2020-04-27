const app = getApp();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    openid: '',
    blogid: '',
    textareaInput: '',
    list: [{
      "text": "",
      "iconPath": "../../icons/home-2-fill.png",
      "selectedIconPath": "../../icons/home-2-fill.png",
    },

    {
      "text": "",
      "iconPath": "../../icons/covid-19.png",
      "selectedIconPath": "../../icons/covid-19.png",
    },
    {
      "text": "",
      "iconPath": "../../icons/news.png",
      "selectedIconPath": "../../icons/news.png",
    }
    ],
  },

  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "getAds",
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


  },


})