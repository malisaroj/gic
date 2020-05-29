const app = getApp()

Page({
  data: {
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
          blogs: res.result.blogs.data,
          posts: res.result.posts.data
          }),
          console.log(res)

      },
      fail: console.error

    })
  }

})
