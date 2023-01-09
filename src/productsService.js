// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;
const fs = require('fs');

const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  // get a product by ID
  let product = productsList.find(prod => prod.id === parseInt(productId));
  return (productId > 0 &&  productId < 5) ? done(null, JSON.stringify(product)) : done('Requested product doesn\'t exist..!', null) ;
}

const saveProduct = (newProduct, done) => {
 // save a product
 let updatedProductList = null;
  let isExists = !!productsList.find(prod => {
    return prod.id === parseInt(newProduct.id)
  });
  if(!isExists) {
    productsList.push(newProduct);
    updatedProductList = { products: productsList };
    fs.writeFile('./products.json', JSON.stringify(updatedProductList), function (err) {
      if (err) throw err;
    });
    return done(null, JSON.stringify(productsList));
  }
  else {
    return done('Product already exists..!', null);
  }
}

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  // update the product list
  let isExists = !!productsList.find(prod => {
    return prod.id === parseInt(productId)
  });
  if(isExists) {
    upd_obj = productsList.findIndex((obj => obj.id === parseInt(productId)));
    productsList[upd_obj].name = updateData['name'];
    productsList[upd_obj].description = updateData['description'];
    productsList[upd_obj].price = updateData['price'];
    productsList[upd_obj].quantity = updateData['quantity'];
    updatedProductList = { products: productsList };
    fs.writeFile(__dirname + '/products.json', JSON.stringify(updatedProductList), function (err) {
      if (err) throw err;
    });
    done(null, JSON.stringify(productsList));
  }
  else {
    done('Requested product doesn\'t exist..!', null);
  }
}

const deleteProduct = (productId, done) => {
  // delete a product    
  let updatedProductList = null;
  let isExists = !!productsList.find(prod => {
    return prod.id === parseInt(productId)
  });
  if(isExists) {
    upd_obj = productsList.findIndex((obj => obj.id === parseInt(productId)));
    productsList.splice(upd_obj, 1);
    updatedProductList = { products: productsList };
    fs.writeFile(__dirname + '/products.json', JSON.stringify(updatedProductList), function (err) {
      if (err) throw err;
    });
    done(null, JSON.stringify(productsList));
  }
  else {
    done('Requested product doesn\'t exist..!', null);
  }
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}