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

  //triggers on tapping on recent topics and redirected to the blog page 
  viewBlog: function(event) {
    let id = event.currentTarget.dataset.id;

    wx.navigateTo({
      url: '../viewBlog/viewBlog?id=' + id,
    })
  },

  onLoad: function(options) {
    console.log(options);
    wx.cloud.callFunction({
      name: "getPosts",
      data: {
        categoryTitle: options.id,
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