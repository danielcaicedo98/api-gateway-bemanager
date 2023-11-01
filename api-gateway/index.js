const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port =  8005;

app.use('/login', createProxyMiddleware({ 
  target: 'https://authentication-production-f0de.up.railway.app', 
  changeOrigin: true
}));

app.use('/quotation', createProxyMiddleware({ 
  target: 'http://bemanager-quotes:8000', 
  changeOrigin: true,
  pathRewrite: {
    '^/quotation': ''
  }
}));

app.use('/clients', createProxyMiddleware({ 
  target: 'http://bemanager-clients:8989', 
  changeOrigin: true,
  pathRewrite: {
    '^/clients': ''
  }
}));

app.use('/providers', createProxyMiddleware({ 
    target: 'http://bemanager-providers:8420', 
    changeOrigin: true,
    pathRewrite: {
      '^/providers': ''
    }
}));

app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
