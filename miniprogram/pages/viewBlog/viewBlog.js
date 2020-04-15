const app = getApp()

Page({
  data: {

  },

  onLoad: function (options) {
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