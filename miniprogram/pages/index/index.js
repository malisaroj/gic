//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    nowTemp: '',
    nowWeather: '',
    nowWeatherBg: '',
    city: 'New York',
    locationTipsText: 'Click to get the current location',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
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

    topicUrls: [{
        "categoryTitle": "Tour Guide",
        "urls": "../../images/tour-guide.jpg"
      },
      {
        "categoryTitle": "Education",
        "urls": "../../images/education.jpg"
      },
      {
        "categoryTitle": "Life Style",
        "urls": "../../images/life-style.jpg"
      },
      {
        "categoryTitle": "Relationship",
        "urls": "../../images/relationship.jpg"
      },
      {
        "categoryTitle": "Health",
        "urls": "../../images/health.jpg"
      },
      {
        "categoryTitle": "News",
        "urls": "../../images/news.jpg"
      }
    ],

  },


  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },

  //triggers on tapping on recent topics and redirected to the blog page 
  viewBlog: function(event) {
    let id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../viewBlog/viewBlog?id=' + id,
    })
  },

  viewCategory: function(event) {
    let title = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../viewCategory/viewCategory?id=' + title,
    })
  },

  onPullDownRefresh() {
    this.getLocation()
  },

  // request the new function to get the city name
  onTapLocation() {
    this.getLocation()
  },

  getLocation() {

    wx.getLocation({
      success: res => {
        this.reverseGeocoder(res.latitude, res.longitude)
      },
      fail: () => {


      }
    })
  },

  // transform location to city name
  reverseGeocoder(lat, lon) {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: lat + ',' + lon,
        get_poi: '1',
        key: 'OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77'
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let city = res;
        console.log(city);
        let temp = 9;
        let weather = 'cloudy'

      },
      complete: () => {
        wx.stopPullDownRefresh();

      }
    })
  },

  onLoad: function() {
    this.getLocation();

    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

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

    wx.cloud.callFunction({
      name: "getPosts",
      success: (res) => {
        this.setData({
          posts: res.result.data
        })
      },
      fail: console.error
    })

    wx.cloud.callFunction({
      name: "getBanners",
      success: (res) => {
        this.setData({
          banners: res.result.data
        })
      },
      fail: console.error
    })

    wx.cloud.callFunction({
      name: "getAds",
      success: (res) => {
        this.setData({
          ads: res.result.data
        })
      },
      fail: console.error
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})