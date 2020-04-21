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
      }),
      wx.cloud.callFunction({
        name: "getComment",
        data: {
          blogid: options.id,
        },
        success: (res) => {
          this.setData({
            comment: res.result.data,
          }),
            console.log(res)

        },
        fail: console.error

      })
  },

  textareaInput(e) {
    this.setData({
      textareaInput: e.detail.value
    })
  },
  writecommentBt: function() {
    const mycontent = this.data.textareaInput
    const mydatetime = timeUtil.formatTime(new Date())
    const myblogid = this.data.blogid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.setData({
          openid: res.result.openid,
        })
      },
      fail: err => {
        console.error('Login Failed', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })


    const myopenid = this.data.openid

    if (mycontent == '') {
      wx.showToast({
        icon: 'none',
        title: 'Cannnot left Empty',
      })
      return
    }
    wx.showLoading({
      title: 'Commenting',
    })

    wx.cloud.callFunction({
      name: 'addComment',
      data: {
        blogid: myblogid,
        openid: myopenid,
        commentdate: mydatetime,
        content: mycontent
      },
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: 'Commented',
          icon: 'success',
          success: function() {
            setTimeout(function() {
              wx.navigateBack({
                url: '../viewBlog/viewBlog',
              })
            }, 2000);
          }
        })
      },
      fail: function(res) {
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: 'Comment Failed',
        })
      }
    })
  }

})