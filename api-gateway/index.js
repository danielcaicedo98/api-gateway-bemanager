const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port =  8005;

app.use('/login', createProxyMiddleware({ 
  target: 'https://authentication-production-f0de.up.railway.app', 
  changeOrigin: true
}));

app.use('/quotation', createProxyMiddleware({ 
  target: 'http://localhost:8000', 
  changeOrigin: true,
  pathRewrite: {
    '^/quotation': 'quotation/'
  }
}));

app.use('/clients', createProxyMiddleware({ 
  target: 'http://localhost:8989', 
  changeOrigin: true,
  pathRewrite: {
    '^/clients': 'listado/'
  }
}));

app.use('/providers', createProxyMiddleware({ 
    target: 'http://localhost:8420', 
    changeOrigin: true,
    pathRewrite: {
      '^/providers': 'providers/api/providers/'
    }
}));

app.use('/articles', createProxyMiddleware({ 
  target: 'http://localhost:8420', 
  changeOrigin: true,
  pathRewrite: {
    '^/articles': 'providers/api/articles/'
  }
}));

app.use('/cashflow', createProxyMiddleware({ 
  target: 'http://localhost:8787', 
  changeOrigin: true,
  pathRewrite: {
    '^/cashflow': 'app/'
  }
}));

app.use('/category', createProxyMiddleware({ 
  target: 'http://localhost:8686', 
  changeOrigin: true,
  pathRewrite: {
    '^/category': 'category/'
  }
}));


app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
