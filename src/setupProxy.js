const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'https://rss.itunes.apple.com/api/v1/hk/ios-apps',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  )
  app.use(
    createProxyMiddleware('/app', {
      target: 'https://itunes.apple.com/hk',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/app': '',
      },
    })
  )
}
