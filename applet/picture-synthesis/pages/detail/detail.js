// detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0
  },

  // 选择图片
  choosePic: function (e) {
    const ctx = wx.createCanvasContext('myCanvas')
    let self = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let imgSrc = res.tempFilePaths[0]
        wx.getImageInfo({
          src: imgSrc,
          success: function (res) {
            let oWidth = res.width, // 原图片宽度
                oHeight = res.height, // 原图片高度
                ctxWidth = 300, // 画布宽度
                ctxHeight = 400,  // 画布高度
                width = 0,  // 照片宽度
                height = 0, // 照片高度
                x = 0,  // 照片x坐标
                y = 0;  // 照片y坐标
            if (oWidth / oHeight > ctxWidth / ctxHeight) {
              // 胖图片
              width = oWidth
              height = oHeight / oWidth * width
              y = ctxHeight / 2 - height / 2
            } else {
              // 瘦图片
              height = ctxHeight
              width = oWidth / oHeight * height
              x = ctxWidth / 2 - width / 2
            }
            ctx.drawImage(imgSrc, x, y, width, height)
            ctx.draw()
          }
        })
      }
    })
  },

  // 导出图片
  exportPic: function (e) {
    let self = this;
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      x: 0,
      y: 0,
      width: 300,
      height: 400,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('导出图片成功')
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '美图秀秀终结者' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        })
        console.log(res.windowWidth)
        console.log(res.windowHeight)
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})