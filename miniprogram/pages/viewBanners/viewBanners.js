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
      "text": "Home",
      "iconPath": "../../icons/home.png",
      "selectedIconPath": "../../icons/home.png",
    },
    {
      "text": "News",
      "iconPath": "../../icons/news.png",
      "selectedIconPath": "../../icons/news.png",
    },
    {
      "text": "Cart",
      "iconPath": "../../icons/shopping-cart.png",
      "selectedIconPath": "../../icons/shopping-cart.png",
    },
    {
      "text": "Account",
      "iconPath": "../../icons/account.png",
      "selectedIconPath": "../../icons/account.png",
    }
    ],
  },

  onLoad: function(options) {
    wx.cloud.callFunction({
      name: "getBanners",
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
        adUnitId: 'adunit-a1f2b50bb39f7688'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }

    // Display interstitial ads in suitable scenes
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }

  },


})