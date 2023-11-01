const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port =  8005;

// app.use('/login', createProxyMiddleware({ 
//     target: 'http://localhost:3030', 
//     changeOrigin: true
// }));
app.use('/login', createProxyMiddleware({ 
  target: 'https://authentication-production-f0de.up.railway.app', 
  changeOrigin: true
}));


app.use('/quotation', createProxyMiddleware({ 
  target: 'http://localhost:8000', 
  changeOrigin: true
}));

app.use('/listado', createProxyMiddleware({ 
  target: 'http://localhost:8989', 
  changeOrigin: true
}));

app.use('/providers', createProxyMiddleware({ 
    target: 'http://localhost:8420', 
    changeOrigin: true
}));





app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
