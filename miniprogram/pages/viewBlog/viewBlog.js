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
      "iconPath": "../../icons/news.png",
      "selectedIconPath": "../../icons/news.png",
    }
    ],
  },

  onLoad: function (options) {
    wx.cloud.callFunction({
      name: "getBlogs",
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

    // Define interstitial ads on the page
    let interstitialAd = null

    // Create an interstitial ad instance in the page onLoad callback event
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-35c9b50593e5bfac'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }

    // Display interstitial ads in suitable scenes
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }


  },


})