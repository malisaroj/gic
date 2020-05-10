const app = getApp();
var timeUtil = require('../../utils/timeUtil.js');

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

  onLoad: function(options) {
    this.data.blogid = options.id;
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

      }),

      // 获取用户信息
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                this.setData({
                  avatarUrl: res.userInfo.avatarUrl,
                  userInfo: res.userInfo
                })
              }
            })
          }
        }
      })

    // Define interstitial ads on the page
    let interstitialAd = null

    // Create an interstitial ad instance in the page onLoad callback event
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-99122be3434c689c'
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