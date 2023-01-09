//Import the necessary dependencies
const http = require('http')
// Define a prot at which the server will run
const PORT = process.env.PORT || 3000;

const productsService = require("./productsService");
const getRequestData = require('./utils');

const server = http.createServer(async (req, res) => {
  // Get all products
  if(req.url === '/api/products' && req.method === 'GET') {
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(JSON.stringify(productsService.getProducts()));
  }
  // Get a product with specified id
  else if(req.url.match(/\/api\/products\/[0-9]/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(JSON.stringify(productsService.getProductsById(id, (err, result) => result )));
  }
  // Create a new product
  else if(req.url === '/api/products' && req.method === 'POST') {
    const payload = await getRequestData(req);
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(JSON.stringify(productsService.saveProduct(payload, (err, result) => result)));
  }
  // Update a specific product
  else if(req.url.match(/\/api\/products\/[0-9]/) && req.method === 'PUT') {
    const payload = await getRequestData(req);
    const id = req.url.split('/')[3];
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(JSON.stringify(productsService.updateProduct(id, payload, (err, result) => result)));
  }
  // Delete a specific Product
  else if(req.url.match(/\/api\/products\/[0-9]/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    res.writeHead(200, {
      'content-type': 'application/json'
    });
    res.end(JSON.stringify(productsService.deleteProduct(id, (err, result) => result)));
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
})