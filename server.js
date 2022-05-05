const Products = require('./api/products');
const express = require('express');
const { Router } = express;
const app = express();
const router = Router();
const PORT = 8080;
const filePath = 'files/products.txt';
const product = new Products(filePath);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const getProducts = (res) => {
    product.getProducts()
    .then((val) => {
        let products = JSON.parse(val)
        res.send(products) 
    })
    .catch(err => res.send({Error: err}))
}

const getProductById = (res, req) => {
    const idProduct = req.params.id;

    product.getProductsById(idProduct)
    .then((product) => res.send(product))
    .catch(err => res.send({Error: err}))
}

const createProduct = (res, req) => {
    product.createProducts(req.body)
    .then((product) => res.send(product))
    .catch(err => res.send({Error: err}))
}

const updateProduct = (res, req) => {
    const idProduct = req.params.id;

    product.updateProductById(req.body, idProduct)
    .then((product) => res.send(product))
    .catch(err => res.send({Error: err}))
}

const deleteProductById = (res, req) => {
    const idProduct = req.params.id;

    product.deleteProductById(idProduct)
    .then((product) =>{ 
        console.log(product);
        res.send(product)
    })
    .catch(err => res.send({Error: err}))
}

app.get('/api/productos', (req, res) => getProducts(res));
app.get('/api/productos/:id', (req, res) => getProductById(res, req));
app.post('/api/productos', (req, res) => createProduct(res, req));
app.put('/api/productos/:id', (req, res) => updateProduct(res, req));
app.delete('/api/productos/:id', (req, res) => deleteProductById(res, req));
app.use('/api/productos', router);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchado en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Eror en el servidor: ${error}`));