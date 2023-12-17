const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const promClient = require('prom-client');

const app = express();
const port =  8005;

app.use('/prometheus', createProxyMiddleware({ 
  target: 'http://prometheus:9090', 
  changeOrigin: true,
  pathRewrite: {
    '^/prometheus': '/'
  }
}));

app.use('/bm_auth', createProxyMiddleware({ 
  target: 'http://prometheus_login:3030', 
  changeOrigin: true,
  pathRewrite: {
    '^/bm_auth': 'bm_auth/'
  }
}));

app.use('/grafana', createProxyMiddleware({ 
  target: 'http://grafana:3000', 
  changeOrigin: true,
  pathRewrite: {
    '^/grafana': '/'
  }
}));


// app.use('/grafana', createProxyMiddleware({ 
//   target: 'https://grafana:3000', 
//   changeOrigin: true
// }));

// const customMetrics = {
//   quotationRequests: new promClient.Counter({
//     name: 'quotation_requests_total',
//     help: 'Total number of requests to the /quotation service',
//   }),
//   loginRequests: new promClient.Counter({
//     name: 'login_requests_total',
//     help: 'Total number of requests to the /login service',
//   }),
//   // Puedes agregar más métricas personalizadas según sea necesario para tus microservicios
// };

// // Ruta para exponer métricas Prometheus
// app.get('/metrics', (req, res) => {
//   res.set('Content-Type', promClient.register.contentType);
//   res.end(promClient.register.metrics());
// });

// // Middleware para registrar métricas al recibir solicitudes al servicio /quotation
// app.use('/quotation_metrics', (req, res, next) => {
//   customMetrics.quotationRequests.inc();
//   next();
// });

// // Middleware para registrar métricas al recibir solicitudes al servicio /login
// app.use('/login_metrics', (req, res, next) => {
//   customMetrics.loginRequests.inc();
//   next();
// });

// app.use('/quotation', createProxyMiddleware({ 
//   target: 'http://bemanager-quotes:8000', 
//   changeOrigin: true,
//   pathRewrite: {
//     '^/quotation': 'quotation/'
//   }
// }));

// app.use('/clients', createProxyMiddleware({ 
//   target: 'http://bemanager-clients:8989', 
//   changeOrigin: true,
//   pathRewrite: {
//     '^/clients': 'listado/'
//   }
// }));

// app.use('/providers/api', createProxyMiddleware({ 
//     target: 'http://bemanager-providers:8420', 
//     changeOrigin: true,
//     pathRewrite: {
//       '^/providers/api': 'providers/api/'
//     }
// }));

// app.use('/cashflow', createProxyMiddleware({ 
//   target: 'http://bemanager-cash-flow:8787', 
//   changeOrigin: true,
//   pathRewrite: {
//     '^/cashflow': 'app/'
//   }
// }));

// app.use('/category', createProxyMiddleware({ 
//   target: 'http://bemanager-products:8686', 
//   changeOrigin: true,
//   pathRewrite: {
//     '^/category': 'category/'
//   }
// }));

app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
