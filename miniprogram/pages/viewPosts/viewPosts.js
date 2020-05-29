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

   
  },


})