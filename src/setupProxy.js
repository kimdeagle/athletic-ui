const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    process.env.REACT_APP_BASE_URL,
    createProxyMiddleware({
      target: process.env.REACT_APP_API_DOMAIN,
      changeOrigin: true,
    })
  );
}