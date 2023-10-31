const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const port =  8005;
//app.use(express.json());
// app.use(cors());



// app.get('/example', (req, res) => {
//     const data = {
//       message: 'Este es un ejemplo de JSON',
//       numero: 42,
//       lista: ['manzana', 'banana', 'cereza'],
//     };
  
//     res.json(data);
//   });

app.use('/login', createProxyMiddleware({ 
    target: 'http://localhost:3030', 
    changeOrigin: true
}));
app.use('/quotation', createProxyMiddleware({ 
  target: 'http://localhost:8000', 
  changeOrigin: true
}));




app.listen(port, () => {
   console.log(`Api Gateway service listening at http://127.0.0.1:${port}`)
})
